│   ├── prisma/               # Database schema and migrations
│   └── src/                  # Express app with order management
│
├── notification-service/
│   ├── Dockerfile
│   ├── package.json          # Node.js dependencies
│   └── src/                  # Worker for email and invoice generation
│
├── docker-compose.yml        # Orchestration for all services
└── README.md
```

## 🛠️ Prerequisites

Before running this project, ensure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/) (v20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2.0+)
- Access to cloud databases (configure environment variables accordingly)

## 🚀 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/creative-microservices.git
   cd creative-microservices
   ```

2. **Configure environment variables**:
   Create `.env` files in each service directory with necessary configurations (database URLs, Redis connection, JWT secrets, etc.).

3. **Build and run with Docker Compose**:
   ```bash
   docker-compose up --build
   ```

   This will start all services and their dependencies.

## 📖 Usage

### Running Individual Services

Build Docker images:
```bash
docker build -t api-gateway:local ./api-gateway
docker build -t auth-service:local ./auth-service
docker build -t product-service:local ./product-service
docker build -t cart-service:local ./cart-service
docker build -t order-service:local ./order-service
docker build -t notification-service:local ./notification-service
```

Run services:
```bash
docker run -d -p 7000:7000 --name api-gateway api-gateway:local
docker run -d -p 8080:8080 --name auth-service auth-service:local
docker run -d -p 5002:5002 --name product-service product-service:local
docker run -d -p 5232:5232 --name cart-service cart-service:local
docker run -d -p 6002:6002 --name order-service order-service:local
docker run -d --name notification-service notification-service:local
```

### API Endpoints

- **Auth Service** (Port 8080):
  - `POST /auth/send-otp` – Send OTP for registration
  - `POST /auth/verify-otp` – Verify OTP and get JWT
  - `GET /auth/user` – Get user profile (JWT required)

- **Product Service** (Port 5002):
  - `GET /api/catalogues` – Get product catalogues
  - `GET /api/categories` – Get categories
  - `GET /api/materials` – Get materials

- **Cart Service** (Port 5232):
  - `GET /api/cart` – Get user's cart
  - `POST /api/cart/add` – Add item to cart
  - `PUT /api/cart/update` – Update cart item

- **Order Service** (Port 6002):
  - `POST /api/orders` – Create new order
  - `GET /api/orders` – Get user's orders

All requests are routed through the API Gateway at `http://localhost:7000`.

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

Please ensure your code follows the project's coding standards and includes appropriate tests.

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **tusharDevelops** - *Initial work* - [GitHub](https://github.com/tusharDevelops)

## 🙏 Acknowledgments

- Thanks to the open-source community for the amazing tools and libraries used in this project.
- Special thanks to Spring Boot, Node.js, ASP.NET Core, and Docker communities.

---

*Made with ❤️ for the creative interior design community*
