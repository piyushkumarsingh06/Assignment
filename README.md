# Full Stack Dashboard Application

A modern, scalable Full Stack Dashboard application built using React and Node.js, featuring JWT-based authentication and complete CRUD functionality.

---

## 🔍 Project Overview

This project demonstrates the implementation of a secure and scalable full-stack web application. It includes user authentication, protected routes, and a dashboard where users can manage tasks using CRUD operations. The application is designed following real-world development practices with clean architecture and separation of concerns.

---

## 🧠 After Analysis – What We Did in This Project

After analyzing the assignment requirements, the project was divided into clear frontend and backend responsibilities to ensure maintainability, scalability, and security.

### Backend Analysis & Implementation
- Designed RESTful APIs using **Node.js and Express.js**
- Implemented **JWT-based authentication** for secure access
- Added **middleware for route protection**
- Structured backend code into controllers, routes, and middleware
- Implemented CRUD APIs for task management
- Ensured proper error handling and validation
- Secured sensitive configuration using environment variables

### Frontend Analysis & Implementation
- Built the frontend using **React.js with Vite**
- Implemented **login and logout flow** using JWT stored in localStorage
- Created a protected dashboard accessible only after authentication
- Integrated backend APIs using Axios
- Implemented CRUD operations with real-time UI updates
- Added search and filter functionality
- Designed a clean, modern, and responsive UI using Tailwind CSS
- Displayed logged-in user profile details fetched from backend

### Integration Analysis
- Frontend and backend communicate via REST APIs
- JWT token is sent securely via Authorization headers
- Centralized API handling for scalability
- Maintained a monorepo structure for better version control

---

## 🚀 Features

- User Authentication (Register / Login / Logout)
- JWT Protected Routes
- User Profile Display
- Dashboard with Task Management (CRUD)
- Search and Filter Tasks
- Modern UI with Tailwind CSS
- Secure API Integration

---

## 🧱 Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- JWT Authentication
- MYSQL

### Tools
- Git & GitHub
- Postman

---

## 📁 Project Structure
Dashboard_Assignment/
│
├── frontend/
│ ├── src/
│ ├── package.json
│ └── vite.config.js
│
├── backend/
│ ├── controllers/
│ ├── routes/
│ ├── middleware/
│ ├── server.js
│ └── package.json
│
└── README.md

