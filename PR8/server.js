const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());

// Middleware for logging visits
app.use((req, res, next) => {
    const logEntry = `${new Date().toISOString()} - IP: ${req.ip}\n`;
    fs.appendFile('visits.log', logEntry, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
    next();
});

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Products API
const products = [
    { id: 1, name: 'Laptop', category: 'electronics' },
    { id: 2, name: 'Phone', category: 'electronics' },
    { id: 3, name: 'Table', category: 'furniture' }
];

// Define the /products route
app.get('/products', (req, res) => {
    res.json(products);
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
