# SupportDesk Pro (MERN Stack)

SupportDesk Pro is a mini SaaS-style **Ticket Management System** built using the **MERN stack**.  
It supports **role-based access control (RBAC)** with three roles:

- Admin — manage users & tickets
- Agent — work on assigned tickets
- User — create & view own tickets

This project demonstrates secure authentication, protected APIs, and real-world workflows.

---

## Technology Stack
- React (Frontend)
- Node.js + Express (Backend)
- MongoDB (Database)
- JWT Authentication

---

## Features
✔ JWT-based login  
✔ Role-based access  
✔ Create & manage tickets  
✔ Assign tickets to agents (admin)  
✔ Users see only their own tickets  
✔ Agents see only assigned tickets  
✔ Admin has full access  

---

## Project Structure
SupportDesk/
├── backend/ → Node.js + Express API
└── frontend/ → React App


---

## Environment Variables (Backend)
Create a `.env` file inside **backend**:



PORT=5000
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_secret_key


---

## Installation & Run

### 1️⃣ Backend


cd backend
npm install
npm run dev


### 2️⃣ Frontend


cd frontend
npm install
npm start


Backend runs on **http://localhost:5000**  
Frontend runs on **http://localhost:3000**

---

## Default Admin
Seed admin using:


GET http://localhost:5000/auth/seed-admin


Login:


Email: admin@test.com

Password: admin123