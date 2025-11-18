"# FindMyStore" 
# ⭐ Store Rating Platform – FullStack Intern Coding Challenge

A full-stack web application that allows users to register, log in, and submit ratings for stores. The system includes three user roles with role-based access control: **System Administrator**, **Normal User**, and **Store Owner**.

---

## 🚀 Tech Stack

### **Backend**
- Express.js / Loopback / NestJS (any one)

### **Frontend**
- React.js

### **Database**
- PostgreSQL  
- Docker (for containerized database)

---

## 📌 Overview

This application provides a unified login system for all users. Based on the user role, each user will have access to specific features.

---

## 🔐 Important Setup Note

Before starting the application, **you must manually create an Admin (System Administrator) in the database**.

Example admin entry to insert manually:

```
name: 'admin'
email: 'admin@example.com'
password: <hashed_password>
role: 'admin'
address: 'Admin Address'
```

This admin account is required to log in and manage users and stores.

---

## 👥 User Roles and Functionalities

### 🧑‍💼 System Administrator
- Add new **stores**, **normal users**, and **admin users**
- Dashboard showing:
  - Total users
  - Total stores
  - Total submitted ratings
- Add new users with:
  - Name, Email, Password, Address
- View all stores with:
  - Name, Email, Address, Rating
- View all users with:
  - Name, Email, Address, Role
- Apply filters by Name, Email, Address, Role
- View detailed user profile  
  - If the user is a Store Owner → show their store rating
- Logout

---

### 👤 Normal User
- Sign up & log in
- Update password
- View list of all stores
- Search stores by Name or Address
- Store listing should display:
  - Store Name  
  - Address  
  - Overall Rating  
  - User’s Submitted Rating  
- Submit rating (1–5) for a store
- Modify previously submitted rating
- Logout

---

### 🏪 Store Owner
- Log in
- Update password
- Dashboard features:
  - View users who rated their store
  - See average store rating
- Logout

---

## ✔️ Form Validations

| Field       | Validation Rules |
|-------------|------------------|
| **Name**    | 20–60 characters |
| **Address** | Max 400 characters |
| **Password**| 8–16 characters, must include at least 1 uppercase letter & 1 special character |
| **Email**   | Must follow valid email format |

---

## 🗄️ Database Setup (Docker + PostgreSQL)

### Sample `docker-compose.yml`:

```yaml
version: "3.1"

services:
  db:
    image: postgres
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: store_rating_db
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

Run the database using:

```sh
docker compose up -d
```

---

## 🏁 Running the Project

### Backend
```sh
cd backend
npm install
npm start
```

### Frontend
```sh
cd frontend
npm install
npm run dev
```

---


## 📜 Summary

The Store Rating Platform demonstrates a complete full-stack application with:

- Role-based access control  
- Full authentication system  
- CRUD operations  
- Store rating functionality  
- Dashboards for admin and store owners  

---

