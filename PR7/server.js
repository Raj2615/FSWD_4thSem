const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;
const logFile = path.join(__dirname, 'visits.log');

// Middleware to log visits
app.use((req, res, next) => {
    const logEntry = `${new Date().toISOString()} - IP: ${req.ip}\n`;
    fs.appendFile(logFile, logEntry, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
    next();
});

// Serve static files (index.html, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Route to get logs
app.get('/logs', (req, res) => {
    fs.readFile(logFile, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Could not read log file' });
        }

        const logs = data.trim().split('\n').map(entry => {
            const parts = entry.split(' - IP: ');
            return { timestamp: parts[0], ip: parts[1] };
        });

        res.json(logs);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
