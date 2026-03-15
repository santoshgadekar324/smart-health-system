# 🏥 Smart Health Diagnosis and Appointment System - Backend

A complete AI-powered healthcare management system backend built with Spring Boot 3, Spring Security, JWT authentication, and MySQL.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Local Setup](#local-setup)
- [Build & Run](#build--run)
- [Docker Deployment](#docker-deployment)
- [Render Deployment](#render-deployment)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

## ✨ Features

- ✅ **User Authentication** - JWT-based secure authentication
- ✅ **Role-based Access Control** - Patient, Doctor, Admin roles
- ✅ **Disease Prediction** - AI-powered symptom analysis
- ✅ **Appointment Management** - Book, manage, and track appointments
- ✅ **Doctor Management** - Browse doctors by specialization
- ✅ **Analytics Dashboard** - Real-time health analytics
- ✅ **RESTful API** - Clean and well-documented endpoints
- ✅ **MySQL Database** - Persistent data storage
- ✅ **Docker Support** - Containerized deployment

## 🛠 Tech Stack

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Security** with JWT
- **Spring Data JPA**
- **MySQL 8.0+**
- **Lombok** for boilerplate reduction
- **Maven** for dependency management
- **Docker** for containerization

## 📁 Project Structure

```
smart-health-backend/
├── src/
│   └── main/
│       ├── java/com/smarthealth/
│       │   ├── models/           # Entity classes
│       │   │   ├── User.java
│       │   │   ├── Doctor.java
│       │   │   ├── Appointment.java
│       │   │   └── Prediction.java
│       │   ├── dto/              # Data Transfer Objects
│       │   │   ├── RegisterRequest.java
│       │   │   ├── LoginRequest.java
│       │   │   ├── AuthResponse.java
│       │   │   ├── BookAppointmentRequest.java
│       │   │   ├── PredictionRequest.java
│       │   │   ├── ApiResponse.java
│       │   │   ├── DiseaseCount.java
│       │   │   └── AnalyticsResponse.java
│       │   ├── repositories/     # JPA Repositories
│       │   │   ├── UserRepository.java
│       │   │   ├── DoctorRepository.java
│       │   │   ├── AppointmentRepository.java
│       │   │   └── PredictionRepository.java
│       │   ├── services/         # Business Logic
│       │   │   ├── AuthService.java
│       │   │   ├── AppointmentService.java
│       │   │   ├── PredictionService.java
│       │   │   ├── DoctorService.java
│       │   │   ├── UserService.java
│       │   │   └── AnalyticsService.java
│       │   ├── controllers/      # REST Controllers
│       │   │   ├── AuthController.java
│       │   │   ├── AppointmentController.java
│       │   │   ├── PredictionController.java
│       │   │   ├── DoctorController.java
│       │   │   ├── UserController.java
│       │   │   └── AnalyticsController.java
│       │   ├── security/         # Security Configuration
│       │   │   ├── JwtTokenProvider.java
│       │   │   ├── JwtAuthenticationFilter.java
│       │   │   ├── UserDetailsServiceImpl.java
│       │   │   └── SecurityConfig.java
│       │   └── SmartHealthApplication.java
│       └── resources/
│           └── application.properties
├── pom.xml
├── Dockerfile
└── README.md
```

## 📦 Prerequisites

- **Java 17** or higher
- **Maven 3.6+**
- **MySQL 8.0+**
- **Docker** (for containerized deployment)

## 🚀 Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/smart-health-backend.git
cd smart-health-backend
```

### 2. Setup MySQL Database

```sql
CREATE DATABASE smart_health_db;
```

### 3. Configure Application Properties

Edit `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/smart_health_db
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

### 4. Install Dependencies

```bash
mvn clean install
```

## 🏃 Build & Run

### Maven Build

```bash
# Build without tests
mvn clean package -DskipTests

# Build with tests
mvn clean package
```

### Run Locally

```bash
# Using Maven
mvn spring-boot:run

# Using Java
java -jar target/smart-health-backend.jar
```

The application will start on `http://localhost:8080`

## 🐳 Docker Deployment

### Build Docker Image

```bash
docker build -t smart-health-backend .
```

### Run Docker Container

```bash
docker run -p 8080:8080 \
  -e DATABASE_URL=jdbc:mysql://host.docker.internal:3306/smart_health_db \
  -e DATABASE_USERNAME=root \
  -e DATABASE_PASSWORD=root \
  smart-health-backend
```

## 🌐 Render Deployment

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/smart-health-backend.git
git push -u origin main
```

### Step 2: Create Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `smart-health-backend`
   - **Environment**: `Docker`
   - **Region**: Choose nearest
   - **Branch**: `main`
   - **Build Command**: (Auto-detected from Dockerfile)
   - **Start Command**: (Auto-detected from Dockerfile)

### Step 3: Add Environment Variables on Render

```
DATABASE_URL=jdbc:mysql://YOUR_MYSQL_HOST:3306/smart_health_db
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
JWT_SECRET=your_secret_key_min_256_bits
```

### Step 4: Deploy

Click **"Create Web Service"** and Render will:
1. Clone your repository
2. Build Docker image using Dockerfile
3. Run the container
4. Provide a public URL

## 📚 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |

### Appointments

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/appointments` | Book appointment |
| GET | `/api/appointments` | Get all appointments |
| GET | `/api/appointments/{id}` | Get appointment by ID |
| GET | `/api/appointments/patient/{id}` | Get patient appointments |
| GET | `/api/appointments/doctor/{id}` | Get doctor appointments |
| PUT | `/api/appointments/{id}/status` | Update appointment status |
| DELETE | `/api/appointments/{id}` | Delete appointment |

### Predictions

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/predictions` | Predict disease |
| GET | `/api/predictions` | Get all predictions |
| GET | `/api/predictions/{id}` | Get prediction by ID |
| GET | `/api/predictions/user/{id}` | Get user predictions |

### Doctors

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/doctors` | Get all doctors |
| GET | `/api/doctors/{id}` | Get doctor by ID |
| GET | `/api/doctors/specialization/{spec}` | Get doctors by specialization |
| GET | `/api/doctors/available` | Get available doctors |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/{id}` | Get user by ID |
| GET | `/api/users/email/{email}` | Get user by email |

### Analytics

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/analytics` | Get dashboard analytics |

## 🔐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `8080` |
| `DATABASE_URL` | MySQL connection URL | `jdbc:mysql://localhost:3306/smart_health_db` |
| `DATABASE_USERNAME` | MySQL username | `root` |
| `DATABASE_PASSWORD` | MySQL password | `root` |
| `JWT_SECRET` | JWT secret key (min 256 bits) | Auto-generated |
| `JWT_EXPIRATION` | JWT token expiration (ms) | `86400000` (24h) |

## 🔧 Troubleshooting

### Build Errors

**Error**: `cannot find symbol getEmail()`

**Solution**: Ensure Lombok is properly configured in `pom.xml` with annotation processor path.

**Error**: `constructor mismatch in DTO classes`

**Solution**: All DTOs use `@Builder`, `@Data`, `@NoArgsConstructor`, `@AllArgsConstructor` annotations.

### Docker Build Issues

**Error**: `mvn clean package` fails in Docker

**Solution**: Check `pom.xml` dependencies and ensure Java 17 is used in Dockerfile.

### Database Connection Issues

**Error**: `Communications link failure`

**Solution**: 
- Verify MySQL is running
- Check `DATABASE_URL` format
- Ensure firewall allows connections
- For Docker: use `host.docker.internal` instead of `localhost`

### Lombok Not Working

**Solution**:
1. Enable annotation processing in IDE
2. Install Lombok plugin for your IDE
3. Verify `maven-compiler-plugin` has Lombok annotation processor path

### JWT Token Issues

**Error**: `JWT secret key too short`

**Solution**: Ensure `JWT_SECRET` is at least 256 bits (32 characters).

## 📝 Sample API Requests

### Register User

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "PATIENT",
    "phone": "1234567890",
    "age": 30,
    "gender": "Male"
  }'
```

### Login

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Book Appointment

```bash
curl -X POST http://localhost:8080/api/appointments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "patientId": 1,
    "doctorId": 2,
    "appointmentDate": "2024-12-25",
    "appointmentTime": "10:00:00",
    "symptoms": "Fever, Cough",
    "consultationType": "IN_PERSON"
  }'
```

### Predict Disease

```bash
curl -X POST http://localhost:8080/api/predictions \
  -H "Content-Type: application/json" \
  -d '{
    "symptoms": "fever, cough, headache",
    "userId": 1,
    "age": 30,
    "gender": "Male"
  }'
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Backend Developer - Spring Boot, Security, JWT

## 🆘 Support

For issues and questions:
- Create an issue on GitHub
- Check troubleshooting section
- Review API documentation

---

**Built with ❤️ for healthcare innovation**
