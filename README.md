# bank-backend

## 🚀 Project Overview

The `bank-backend` project serves as the foundational backend infrastructure for a modern banking application. Developed with Java and Spring Boot, this repository aims to provide secure, robust, and scalable APIs to manage core banking functionalities such as user accounts, transactions, and security configurations.

**Note:** This description is inferred from the project's name and initial structure. A more detailed project description will be added as development progresses.

## ✨ Key Features

While the project is in its early stages, the foundational structure anticipates the development of the following key features:

*   **Robust Security Configuration:** Implements Spring Security to ensure secure API endpoints with authentication and authorization mechanisms. (Evidenced by `SecurityConfig.java`)
*   **Customizable Web Server:** Configures the embedded Tomcat server for optimal performance and flexibility in handling web requests. (Evidenced by `TomcatConfig.java`)
*   **Core Banking Logic Foundation:** Provides the initial setup for building modules related to user management, account operations, and transaction processing.
*   **Scalable Architecture:** Built on Spring Boot, designed for ease of development, deployment, and scalability.
*   **Gradle Build System:** Utilizes Gradle for efficient dependency management, build automation, and project consistency.

## 🛠️ Prerequisites

Before you can set up and run this project, ensure you have the following software installed on your system:

*   **Java Development Kit (JDK):** Version 17 or newer (e.g., OpenJDK 17).
    *   [Download JDK](https://www.oracle.com/java/technologies/downloads/)
*   **Gradle:** Version 7.x or newer (typically included as a wrapper, but good to ensure compatibility).
    *   [Download Gradle](https://gradle.org/install/)
*   **Git:** For cloning the repository.
    *   [Download Git](https://git-scm.com/downloads)

## 📦 Installation & Setup

Follow these steps to get a local development environment up and running:

1.  **Clone the Repository:**
    Start by cloning the `bank-backend` repository to your local machine:
    ```bash
    git clone https://github.com/MATEQH/bank-backend.git
    cd bank-backend
    ```

2.  **Build the Project:**
    Use the Gradle wrapper to build the project and download all necessary dependencies.
    ```bash
    ./gradlew clean build
    ```
    *For Windows users, use `gradlew.bat clean build`.*

3.  **Run the Application:**
    After a successful build, you can start the Spring Boot application using the Gradle wrapper:
    ```bash
    ./gradlew bootRun
    ```
    Alternatively, you can run the generated JAR file directly:
    ```bash
    java -jar build/libs/bank-backend-*.jar
    ```
    The application should typically start on `http://localhost:8080`, unless configured otherwise.

## ⚙️ Configuration

The application's behavior can be customized through various configuration options.

*   **Spring Boot Properties:**
    The primary configuration is managed via `application.properties` or `application.yml` files, usually located in `src/main/resources`. These files allow you to configure database connections, server ports, logging levels, and other Spring Boot specific settings.
    ```properties
    # src/main/resources/application.properties example
    spring.application.name=bank

    server.port=8080

    spring.datasource.url=jdbc:postgresql://localhost:5432/bankdb
    spring.datasource.username=postgres
    spring.datasource.password=#ASDasd123
    spring.datasource.driver-class-name=org.postgresql.Driver

    spring.jpa.hibernate.ddl-auto=update
    spring.jpa.show-sql=true
    spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

    jwt.secret=supersecretkey
    jwt.expiration=3600000
    ```

*   **Security Configuration (`config/SecurityConfig.java`):**
    This file defines the security rules, authentication providers, authorization policies, and potentially CORS settings for the application. Modifications here will directly impact how users and systems interact securely with the backend.

*   **Tomcat Configuration (`config/TomcatConfig.java`):**
    This class allows for programmatic customization of the embedded Tomcat server. You can configure aspects like connectors, maximum threads, session management, and other server-specific properties beyond what `application.properties` typically provides.

## 🙏 Acknowledgments

*   Built with the incredible [Spring Boot](https://spring.io/projects/spring-boot) framework.
*   Managed by the powerful [Gradle](https://gradle.org/) build automation tool.
*   Powered by [Java](https://www.java.com/en/).