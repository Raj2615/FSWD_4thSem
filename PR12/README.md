# User Profile Manager

A simple Node.js application demonstrating MongoDB and Mongoose integration for managing user profiles.

## Prerequisites

- Node.js installed on your system
- MongoDB installed locally or a MongoDB Atlas account
- npm (Node Package Manager)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
- Copy the `.env` file and update the `MONGODB_URI` with your MongoDB connection string
- If using MongoDB Atlas, replace the URI with your cluster connection string

3. Start the server:
```bash
npm start
```
For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

- `POST /users` - Create a new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30
  }
  ```

- `GET /users` - Get all users

## MongoDB Connection

This project uses MongoDB as the database. You can either:
1. Install MongoDB locally and use the default connection string
2. Create a free cluster on MongoDB Atlas and use the provided connection string

## Project Structure

- `server.js` - Main application file
- `models/User.js` - User model definition
- `.env` - Environment variables (create this file)
- `package.json` - Project dependencies and scripts 