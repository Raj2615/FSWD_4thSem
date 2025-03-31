# Task Manager API with Testing

This is a simple Task Manager API built with Express.js and tested using Jest and Supertest.

## Features

- Create tasks
- Get all tasks
- Update tasks
- Delete tasks
- Comprehensive test coverage

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run the application:
```bash
npm start
```

3. Run tests:
```bash
npm test
```

## API Endpoints

- `POST /tasks` - Create a new task
- `GET /tasks` - Get all tasks
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

## Testing

The project uses Jest and Supertest for testing. Tests cover:
- Task creation with valid and invalid data
- Retrieving all tasks
- Updating existing and non-existent tasks
- Deleting existing and non-existent tasks

## Project Structure

- `src/app.js` - Main application file
- `src/app.test.js` - Test file
- `package.json` - Project configuration and dependencies 