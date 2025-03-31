const express = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;
const SECRET_KEY = 'your_secret_key';
const orders = [];
const users = [];

app.use(express.json());
app.use(cookieParser());

// Logging Middleware
app.use((req, res, next) => {
    const logEntry = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
    fs.appendFile('server.log', logEntry, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
    next();
});

// Authentication Middleware
const authenticate = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid token' });
    }
};

// Authorization Middleware
const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' });
    }
    next();
};

// Orders Router
const orderRouter = express.Router();
orderRouter.post('/', authenticate, (req, res) => {
    const { item, quantity } = req.body;
    if (!item || !quantity) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const order = { id: orders.length + 1, item, quantity, user: req.user.username };
    orders.push(order);
    res.status(201).json(order);
});

orderRouter.get('/', authenticate, (req, res) => {
    res.json(orders);
});

orderRouter.get('/:id', authenticate, (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
});

orderRouter.put('/:id', authenticate, (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }
    const { item, quantity } = req.body;
    if (item) order.item = item;
    if (quantity) order.quantity = quantity;
    res.json(order);
});

orderRouter.delete('/:id', authenticate, authorizeAdmin, (req, res) => {
    const index = orders.findIndex(o => o.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ error: 'Order not found' });
    }
    orders.splice(index, 1);
    res.status(204).send();
});
app.use('/orders', orderRouter);

// Authentication Routes
app.post('/auth/register', (req, res) => {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    users.push({ username, password, role });
    res.status(201).json({ message: 'User registered' });
});

app.post('/auth/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true }).json({ message: 'Logged in' });
});

app.post('/auth/logout', (req, res) => {
    res.clearCookie('token').json({ message: 'Logged out' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// 404 Middleware
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Start Server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});