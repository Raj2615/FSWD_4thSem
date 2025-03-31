# Task Manager App with React Testing

This project demonstrates a simple Task Manager application built with React and tested using React Testing Library.

## Features

- Add new tasks
- Mark tasks as complete/incomplete
- Responsive design
- Comprehensive test coverage

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run the tests:
```bash
npm test
```

## Testing

The project includes comprehensive tests for both the TaskList and AddTask components. The tests cover:

### TaskList Component Tests
- Rendering empty state
- Rendering list of tasks
- Task completion toggling

### AddTask Component Tests
- Form rendering
- Form submission with valid input
- Empty input handling
- Enter key submission

## Project Structure

```
src/
  ├── components/
  │   ├── TaskList.js
  │   ├── TaskList.test.js
  │   ├── AddTask.js
  │   └── AddTask.test.js
  ├── App.js
  ├── App.css
  └── setupTests.js
```

## Technologies Used

- React
- React Testing Library
- Jest
- CSS3 