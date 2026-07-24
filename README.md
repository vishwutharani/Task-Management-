# MERN Stack Task Management System

MERN Stack Task Management System is a full-stack web application developed using MongoDB, Express.js, React.js, and Node.js. The application enables administrators to assign and manage tasks while allowing employees to track and update the status of their assigned tasks. It provides secure authentication, role-based authorization, task tracking, email notifications, and an intuitive user interface.

Project Overview

This project was developed as part of a technical assessment to demonstrate full-stack web development skills using the MERN Stack. The system includes separate dashboards for Admin and Employee users with secure authentication and complete task management functionality.

Features

Authentication

* Secure JWT-based authentication
* Separate login for Admin and Employee
* Password encryption using bcrypt
* Protected routes with role-based authorization

Admin Module

* View all registered employees
* Assign tasks to employees
* Set task priority (High, Medium, Low)
* Monitor task statistics
* Search tasks
* Pagination for task management
* Email notification sent automatically when a task is assigned

Employee Module

* Login securely
* View assigned tasks
* Update task status
* Track task priority
* User-friendly dashboard

Task Status

* Not Started
* In Progress
* Completed

Technology Stack

Frontend

* React.js
* React Router DOM
* Axios
* CSS

Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Nodemailer

Project Structure

task-management-system

backend

* config
* controllers
* middleware
* models
* routes
* utils
* server.js

frontend

* src

  * api
  * components
  * pages
  * styles
  * App.jsx
  * main.jsx

README.md

Installation

Clone the repository

git clone [https://github.com/yourusername/task-management-system.git](https://github.com/yourusername/task-management.git)

Move into the project directory

cd task-management-system

Backend Setup

Navigate to the backend folder

cd backend

Install dependencies

npm install

Create a .env file and configure the following variables

PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/task_management

JWT_SECRET=your_secret_key

EMAIL=[your_email@gmail.com](mailto:your_email@gmail.com)

PASSWORD=your_gmail_app_password

Start the backend server

npm run dev

Frontend Setup

Navigate to the frontend folder

cd frontend

Install dependencies

npm install

Run the React application

npm run dev

Email Notification

Whenever an administrator assigns a task to an employee, the system automatically sends an email containing the task title, description, and priority.

Authentication

The application uses JSON Web Token (JWT) authentication for secure login and role-based authorization. Passwords are encrypted using bcrypt before being stored in the database.

Future Enhancements

* Task due dates
* File attachment support
* Task comments
* Activity logs
* User profile management
* Dashboard analytics with charts
* Dark mode
* Email reminders for pending tasks

Screenshots

You can include screenshots of the following pages:

* Login Page
* Admin Dashboard
* Employee Dashboard
* Task Assignment Page
* Task Statistics

Author

VISWADHARANI S

GitHub: [https://github.com/vishwutharani](https://github.com/yourusername)

Email: [your_email@example.com](mailto:your_email@example.com)

License

This project was developed as part of a Technical Assessment to demonstrate practical knowledge of full-stack web development using the MERN Stack. It is intended for educational and evaluation purposes.
