# Task Manager API

A RESTful API for managing tasks using Express.js and MongoDB.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Make sure MongoDB is running on your system

3. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/task-manager
```

4. Start the server:
```bash
npm start
```
or for development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Tasks

- `GET /tasks` - Get all tasks
  - Query parameters:
    - `status`: Filter by status (Pending/Completed)
    - `dueDate`: Filter by due date (ISO format)

- `GET /tasks/:id` - Get a specific task by ID

- `POST /tasks` - Create a new task
  - Required fields:
    - `title`: Task title
    - `dueDate`: Task due date
  - Optional fields:
    - `description`: Task description
    - `status`: Task status (Pending/Completed)

- `PUT /tasks/:id` - Update a task
  - All fields are optional

- `DELETE /tasks/:id` - Delete a task

## Example Request

Create a new task:
```bash
curl -X POST http://localhost:3000/tasks \
-H "Content-Type: application/json" \
-d '{
  "title": "Complete project",
  "description": "Finish the task manager API",
  "status": "Pending",
  "dueDate": "2024-03-20T00:00:00.000Z"
}'
```

## Error Handling

The API includes basic error handling for:
- Invalid task IDs
- Missing required fields
- Database connection issues
- Server errors 