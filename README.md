# LIBRARY-MANAGEMENT-SYSTEM

A Node.js + Express.js based backend API for managing a digital library system, featuring secure authentication, role-based access control, book management, user and librarian management, and borrowing/return tracking functionalities.
It is designed with scalable architecture, input validation (Joi), Sequelize ORM, and JWT-based authentication.

### Quick Note:
- User/Librarian will get their login password in the registered email after they register. Please make sure to add your SMTP credentials in .env file.   

## 🚀 Tech Stack
* Node.js – JavaScript runtime for backend development
* Express.js – Web framework for building RESTful APIs
* Sequelize ORM – Object-relational mapping for MySQL/SQLite
* JWT (jsonwebtoken) – For secure authentication and authorization
* Joi – Schema-based request validation
* Nodemailer – Email service integration
* dotenv – Environment configuration
* bcryptjs – Password hashing for secure storage

## 🌐 API Base URL
- http://localhost:6473/api/v1/

## ⚙️ Project Setup & Run Instructions
Follow the steps below to set up and run the project locally.

### 🧩 1. Clone the Repository
- git clone https://github.com/Shayandip/LIBRARY-MANAGEMENT-SYSTEM.git
- cd library_management_system

### 📦 2. Install Dependencies
Ensure that Node.js v16+ and npm are installed on your system.
- npm install

### 🔑 3. Configure Environment Variables
Make Sure to replace these with your own key in .env:
- EMAIL_USER=YOUR_EMAIL_ID
- EMAIL_PASS=SMTP_PASSWORD

### 🗃️ 4. Database Setup
This project uses Sequelize ORM.
Make sure your database is running and configured properly.
You can sync tables (if defined in the Sequelize setup) using:
- sequelize.sync({ alter: true });

### 🚀 5. Start the Server
Development Mode (with auto-reload)
- npm run dev

Once started, the server runs at:
- http://localhost:6473


## 🔐 API Overview
#### Authentication Routes
| Endpoint          | Method | Access | Description          |
| ----------------- | ------ | ------ | -------------------- |
| `/admin-register` | POST   | Public | Register a new admin |
| `/admin-login`    | POST   | Public | Admin login          |
| `/register`       | POST   | Public | Register a new user  |
| `/login`          | POST   | Public | User login           |

#### Account Routes
| Endpoint                | Method | Access           | Description                        |
| ----------------------- | ------ | ---------------- | ---------------------------------- |
| `/create-user`          | POST   | Admin            | Create a new user                  |
| `/admin/user-list`      | GET    | Admin, Librarian | List all users                     |
| `/admin/librarian-list` | GET    | Admin            | List all librarians                |
| `/user/librarian-list`  | GET    | User             | View librarians available to users |
| `/profile`              | GET    | Librarian, User  | View profile                       |
| `/update/:id`           | PATCH  | Admin            | Update profile                     |
| `/approve/:id`          | PATCH  | Admin            | Approve account                    |
| `/remove/:id`           | DELETE | Admin            | Delete account                     |

#### Book Routes
| Endpoint           | Method | Access                 | Description         |
| ------------------ | ------ | ---------------------- | ------------------- |
| `/create-book`     | POST   | Admin                  | Add a new book      |
| `/book-list`       | GET    | Admin, Librarian, User | List books          |
| `/update-book/:id` | PATCH  | Admin                  | Update book details |
| `/remove-book/:id` | DELETE | Admin                  | Delete a book       |

#### Borrowed Book Routes
| Endpoint                             | Method | Access           | Description                      |
| ------------------------------------ | ------ | ---------------- | -------------------------------- |
| `/borrow-book-libraian`              | POST   | Librarian        | Borrow book for a user           |
| `/borrow-book`                       | POST   | User             | Borrow a book                    |
| `/borrow-record-librarian/:userId`   | GET    | Librarian, Admin | Borrow record by user            |
| `/borrow-record`                     | GET    | User             | Borrow record for logged-in user |
| `/return-book-librarian/:id/:userId` | PATCH  | Librarian        | Return book for a user           |
| `/return-book/:id`                   | PATCH  | User             | Return borrowed book             |


## 🧩 Middleware & Validations
- authenticateToken – Verifies JWT token.
- authorize(...roles) – Role-based access control (Admin, Librarian, User).
- validate(schema) – Ensures request body matches schema.
- Validation Files – Located in validators/, using Joi for strong schema validation.
- Enums – Defined in helper/enum.js for role and status management.

## ✨ Features
* 🔐 Secure JWT Authentication & Authorization
* 👥 Role-based Access Control (Admin, Librarian, User)
* 📚 Book Management (CRUD operations)
* 📖 Borrow and Return System
* 🧾 Validation using Joi
* ✉️ Email Integration via Nodemailer
* 🗃️ Sequelize ORM for MySQL / SQLite
* 🧠 Modular Controller & Route Structure

## 🧑‍💻 Scripts
| Command       | Description                                           |
| ------------- | ----------------------------------------------------- |
| `npm run dev` | Start the application with Nodemon (development mode) |
