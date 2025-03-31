const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const tasksFile = './tasks.json';

// Load tasks from file
const loadTasks = () => {
    if (!fs.existsSync(tasksFile)) return [];
    const data = fs.readFileSync(tasksFile);
    return JSON.parse(data);
};

// Save tasks to file
const saveTasks = (tasks) => {
    fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
};

let tasks = loadTasks();

// Middleware to validate task input
const validateTask = (req, res, next) => {
    const { title, status } = req.body;
    if (!title || typeof title !== 'string') {
        return res.status(400).json({ error: 'Title is required and must be a string' });
    }
    if (status && !['pending', 'completed'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status value' });
    }
    next();
};

// CRUD Endpoints for Tasks
app.post('/tasks', validateTask, (req, res) => {
    const { title, status = 'pending' } = req.body;
    const task = { id: tasks.length + 1, title, status };
    tasks.push(task);
    saveTasks(tasks);
    res.status(201).json(task);
});

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
});

app.put('/tasks/:id', validateTask, (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    const { title, status } = req.body;
    if (title) task.title = title;
    if (status) task.status = status;
    saveTasks(tasks);
    res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
    const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    tasks.splice(index, 1);
    saveTasks(tasks);
    res.status(204).send();
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
