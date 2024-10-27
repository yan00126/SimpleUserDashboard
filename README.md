# SimpleUserDashboard

# Project Overview

This is a user management application built with **Next.js** for the frontend and **Express.js** with **MongoDB** for the backend. The application allows administrators to create, read, update, and delete user accounts.

## Getting Started

Follow these steps to set up and run the application locally.

### Prerequisites

- **Node.js** (v14 or later)
- **MongoDB** (either locally or using a cloud service like MongoDB Atlas)
- **npm** or **yarn** (for package management)

### Setting Up the Backend

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the Backend Directory**

   ```bash
   cd server
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Set Up Environment Variables**

   - Create a `.env` file in the server directory and add your MongoDB connection string:
     ```
     MONGODB_URI=<your-mongodb-connection-string>
     ```

5. **Run the Backend Server**
   ```bash
   npm start
   ```
   The server will start on [http://localhost:5000](http://localhost:5000).

### Setting Up the Frontend

1. **Navigate to the Frontend Directory**

   ```bash
   cd client
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```
   The frontend will be available at [http://localhost:3000](http://localhost:3000).

## Application Features

- **User Authentication**: Admins can log in using predefined credentials.
- **User Management**: Admins can create, read, update, and delete user accounts.
- **Role Management**: Users can be assigned roles (admin or user).

## API Endpoints

- `POST /login`: Authenticate a user.
- `POST /users`: Create a new user (admin only).
- `GET /users`: Retrieve all users.
- `PUT /users/:id`: Update a user by ID.
- `DELETE /users/:id`: Delete a user by ID.

## Notes

- Ensure that your MongoDB server is running before starting the backend.
- You can modify the user roles and permissions as needed in the code.
