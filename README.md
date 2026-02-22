# 🚀 Creative Interiors – Polyglot Microservices Platform

[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![ASP.NET Core](https://img.shields.io/badge/ASP.NET_Core-512BD4?style=for-the-badge&logo=.net&logoColor=white)](https://dotnet.microsoft.com/en-us/apps/aspnet)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://mysql.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)

Welcome to **Creative Interiors**, a cutting-edge, Dockerized, polyglot microservices-based platform designed for online interior design and product customization. This project showcases a scalable, event-driven architecture leveraging Redis Pub/Sub and a diverse set of backend technologies to deliver a seamless user experience.

## ✨ Features

- **Polyglot Architecture**: Built with multiple programming languages and frameworks for optimal service-specific performance.
- **Event-Driven Design**: Asynchronous processing using Redis Pub/Sub for decoupled communication.
- **Containerized Deployment**: Fully Dockerized services for easy scaling and deployment.
- **Cloud-Native Databases**: Integrated with managed cloud databases for reliability and scalability.
- **Authentication & Authorization**: Secure OTP-based authentication with JWT tokens.
- **Real-Time Notifications**: Email notifications and invoice generation for orders.
- **Modular Services**: Independent microservices for Auth, Products, Cart, Orders, and Notifications.

## 🏗️ Architecture Overview

```
┌─────────────────────────────┐
│        CLIENT LAYER         │
│ ┌─────────────┐  ┌────────┐ │
│ │ Web (NextJS)│  │ Mobile │ │
│ └──────┬──────┘  └───┬────┘ │
└────────┼─────────────┼──────┘
         │             │
         │    HTTPS / JWT
         ▼             ▼
┌──────────────────────────────┐
│         API GATEWAY          │
│ (Nginx)                      │
│ - Routing & Load Balancing   │
│ - CORS Handling              │
│ - Authentication (JWT)       │
└───────────────┬──────────────┘
                │
┌──────────┼────────────────────────────────────────┐
│          │                │           │           │
▼          ▼                ▼           ▼           ▼
┌────────┐ ┌──────────┐   ┌──────────┐ ┌────────┐ ┌────────────┐
│ Auth   │ │ Product  │   │ Cart     │ │ Order  │ │Notification│
│Service │ │Service   │   │Service   │ │Service │ │Service     │
│(Spring)│ │(Node.js) │   │(.NET)    │ │(Node)  │ │(Node.js)   │
└───┬────┘ └────┬─────┘   └────┬─────┘ └────┬───┘ └────┬───────┘
    │           │              │           │          │
    ▼           ▼              ▼           ▼          ▼
┌──────┐     ┌────────┐     ┌────────┐  ┌────────┐  ┌────────┐
│MySQL │     │MongoDB │     │Postgre │  │Postgre │  │Redis   │
│(Auth)│     │(Products)│   │(Cart)  │  │(Orders)│  │(Pub/Sub)│
└──────┘     └────────┘     └────────┘  └────────┘  └────────┘
    ▲           │
    │           ▼
    │    ┌────────────────┐
    │    │ Message Broker │
    │    │ Redis Pub/Sub  │
    │    │ - Async Events │
    │    │ - Notifications│
    │    │ - Analytics    │
    │    └────────────────┘
    │
    ▼
┌────────────────┐
│ Redis Cache    │
│ - OTP Storage  │
│ - Session Data │
│ - Product Cache│
└────────────────┘
```
- **Client Layer**: Web (Next.js) and Mobile applications communicating via HTTPS/JWT
- **API Gateway**: Nginx reverse proxy for routing, load balancing, CORS handling, and JWT authentication
- **Microservices**:
  - **Auth Service**: Spring Boot + MySQL + Redis – Handles user registration, OTP verification, JWT issuance, email notifications
  - **Product Service**: Node.js + Express + MongoDB – Manages product catalogues, categories, and materials
  - **Cart Service**: ASP.NET Core + PostgreSQL (EF Core) – Handles shopping cart operations and item management
  - **Order Service**: Node.js + Express + PostgreSQL (Prisma) – Processes orders and publishes events
  - **Notification Service**: Node.js + Redis Pub/Sub – Consumes events to send emails and generate PDF invoices
- **Message Broker**: Redis Pub/Sub for asynchronous event processing
- **Cache**: Redis for OTP storage, session data, and product caching
- **Containerization**: Docker for all services
- **Orchestration**: Docker Compose for local development
- **Cloud Databases**:
  - MySQL: Aiven
  - PostgreSQL: Neon/Aiven
  - MongoDB: Atlas
  - Redis: Upstash
## 📁 Project Structure

```
creative-microservices/
│
├── api-gateway/
│   ├── Dockerfile
│   └── gateway.conf          # Nginx configuration
│
├── auth-service/
│   ├── Dockerfile
│   ├── pom.xml               # Spring Boot dependencies
│   └── src/                  # Java source code
│
├── product-service/
│   ├── Dockerfile
│   ├── package.json          # Node.js dependencies
│   └── src/                  # Express app with modules for catalogues, categories, materials
│
├── cart-service/
│   ├── Dockerfile
│   ├── CartService.csproj    # .NET project file
│   └── Controllers/          # ASP.NET Core controllers
│
├── order-service/
│   ├── Dockerfile
│   ├── package.json          # Node.js dependencies
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

- **aquib-eng** - *Initial work* - [GitHub](https://github.com/aquib-eng)

## 🙏 Acknowledgments

- Thanks to the open-source community for the amazing tools and libraries used in this project.
- Special thanks to Spring Boot, Node.js, ASP.NET Core, and Docker communities.

---

*Made with ❤️ for the creative interior design community*
