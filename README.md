# 🎓 School Platform API & Dashboard

> A robust backend API with a premium frontend dashboard for managing school users and payments. Built for the technical assessment.

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

## 📋 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Testing](#-testing)

## ✨ Features

### Backend
- **🔐 Secure Authentication**: JWT-based auth with password hashing (Bcrypt).
- **🛡️ RBAC**: Role-Based Access Control (Admin, Teacher, Student).
- **💳 Payments**: Mock payment processing with transaction history.
- **💾 Flexible Database**: Auto-detects local MongoDB or falls back to **In-Memory MongoDB** (Zero config setup!).
- **🛡️ Security**: Implements Helmet headers and CORS.

### Frontend
- **🎨 Premium UI**: Modern, dark-themed dashboard with glassmorphism effects.
- **📱 Responsive**: Fully responsive design for all devices.
- **⚡ Dynamic**: Real-time UI updates for transactions and auth state.

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Testing**: MongoDB Memory Server (for isolated testing)
- **Frontend**: Vanilla HTML, CSS (Custom Design), JavaScript

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+ recommended)
- npm

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd school-platform
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    The app comes with a pre-configured `.env` for development.
    ```bash
    # .env content
    MONGO_URI=mongodb://localhost:27017/school_platform
    JWT_SECRET=secret123
    PORT=5000
    ```

4.  **Run the Application**
    ```bash
    npm start
    ```
    *The server will start on `http://localhost:5000`. If you don't have MongoDB installed, it will automatically start an in-memory database instance.*

## 📖 API Documentation

### Interactive Docs (Swagger UI)
Explore and test the API endpoints directly via the browser:
👉 **[http://localhost:5000/api-docs](http://localhost:5000/api-docs)**

### Authentication

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user | Public |
| `POST` | `/api/auth/login` | Login user & get token | Public |
| `GET` | `/api/auth/profile` | Get current user profile | Private |

### Payments

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/payments` | Create a transaction | Private |
| `GET` | `/api/payments` | Get my transactions | Private |
| `GET` | `/api/payments/all` | Get all transactions | Admin |

## 📂 Project Structure

```
├── public/             # Frontend Static Files
│   ├── index.html      # Single Page App Entry
│   ├── style.css       # Custom Premium Styles
│   └── app.js          # Frontend Logic
├── src/
│   ├── config/         # DB Connection
│   ├── controllers/    # Route Logic
│   ├── middlewares/    # Auth & Error Handling
│   ├── models/         # Mongoose Schemas
│   ├── routes/         # API Routes
│   └── main.js         # App Entry Point
├── test-api.js         # Automated Verification Script
└── package.json
```

## 🧪 Testing

Run the automated verification script to test all API endpoints:

```bash
node test-api.js
```

This script will:
1. Register Admin & User
2. Login & Verify Tokens
3. Test RBAC (Admin-only routes)
4. Process a Mock Payment
5. Verify Transaction History

---

**Developed by Ahmed**
