This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

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
