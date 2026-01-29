const redis = require("./config/redis")
const { sendOrderConfirmation } = require("./services/mail.service")

const STREAM = "order_stream"
const GROUP = "notification_group"
const CONSUMER = "mail_worker_1"

async function initGroup() {
  try {
    await redis.xgroup("CREATE", STREAM, GROUP, "$", "MKSTREAM")
  } catch (_) {
    // group already exists
  }
}

function parseFields(fields) {
  const data = {}

  for (let i = 0; i < fields.length; i += 2) {
    data[fields[i]] = fields[i + 1]
  }

  // 🔥 IMPORTANT: items string → array
  if (data.items) {
    data.items = JSON.parse(data.items)
  }

  return data
}

async function startConsumer() {
  await initGroup()
  console.log("📨 Notification service started")

  while (true) {
    const response = await redis.xreadgroup(
      "GROUP", GROUP, CONSUMER,
      "BLOCK", 5000,
      "COUNT", 1,
      "STREAMS", STREAM, ">"
    )

    if (!response) continue

    const [, messages] = response[0]

    for (const [id, fields] of messages) {
      const order = parseFields(fields)

      try {
        await sendOrderConfirmation(order)
        await redis.xack(STREAM, GROUP, id)
        console.log("✅ Mail sent for order:", order.orderNumber)
      } catch (err) {
        console.error("❌ Mail failed, retrying later", err.message)
      }
    }
  }
}

module.exports = startConsumer
