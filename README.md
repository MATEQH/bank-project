# 🏦 Bank Project

A full-stack banking application built with **Spring Boot**, **React**, and **PostgreSQL**. The project demonstrates a modern banking platform with secure authentication, account management, transaction history, and financial analytics.

## 📸 Screenshots

### Dashboard

![Dashboard](frontend/img.png)

### Transactions

![Transactions](frontend/img_1.png)

---

## ✨ Features

### Backend

* JWT-based authentication and authorization
* Spring Security integration
* RESTful API architecture
* PostgreSQL database support
* Account and transaction management
* Custom Tomcat configuration
* Scalable Spring Boot architecture

### Frontend

* User registration and login
* Secure JWT authentication flow
* Account overview dashboard
* Transaction history
* Expense analytics with charts
* Product recommendations
* Responsive UI built with Tailwind CSS
* Toast notifications

---

## 🏗️ Project Structure

```text
bank-project/
│
├── backend/                 # Spring Boot application
│   ├── src/
│   ├── build.gradle
│   └── ...
│
├── frontend/                # React + TypeScript application
│   ├── src/
│   ├── package.json
│   └── ...
│
├── docs/                    # Screenshots and assets
│
└── README.md
```

---

## 🛠️ Tech Stack

### Backend

* Java 17
* Spring Boot
* Spring Security
* Spring Data JPA
* PostgreSQL
* Gradle

### Frontend

* React
* TypeScript
* Vite
* TanStack Router
* TanStack Query
* Tailwind CSS
* Axios
* React Toastify

---

## 📋 Prerequisites

Before running the project, make sure you have installed:

* Java 17+
* Node.js 18+
* PostgreSQL
* Git

---

## ⚙️ Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Configure your PostgreSQL database in:

```properties
src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/bankdb
spring.datasource.username=postgres
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update

jwt.secret=your_secret_key
jwt.expiration=3600000
```

Run the backend:

```bash
./gradlew bootRun
```

Windows:

```bash
gradlew.bat bootRun
```

The backend will be available at:

```text
http://localhost:8080
```

---

## 💻 Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

---

## 🚀 Running the Full Application

### 1. Start PostgreSQL

Make sure PostgreSQL is running and the database exists.

### 2. Start Backend

```bash
cd backend
./gradlew bootRun
```

### 3. Start Frontend

```bash
cd frontend
npm install
npm run dev
```

### 4. Open the Application

```text
http://localhost:5173
```

---

## 🔐 Authentication

The application uses JWT-based authentication.

Authentication flow:

1. User registers or logs in.
2. Backend validates credentials.
3. JWT token is generated.
4. Frontend stores the token.
5. Protected API requests include the token in the Authorization header.

---

## 🎯 Purpose

This project was created to demonstrate full-stack software engineering skills, including:

* Backend API development
* Secure authentication
* Database design
* Frontend development with React
* State management and API integration
* Modern application architecture

---

## 👨‍💻 Author

**Máté Molnár**

* GitHub: https://github.com/MATEQH
* Portfolio: https://mateqh.hu
