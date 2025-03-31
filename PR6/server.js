const http = require('http');
const fs = require('fs');
const path = require('path');

const usersFile = path.join(__dirname, 'users.json');
const indexFile = path.join(__dirname, 'index.html');

function getUsers() {
    if (!fs.existsSync(usersFile)) return [];
    return JSON.parse(fs.readFileSync(usersFile, 'utf8'));
}

function saveUsers(users) {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        fs.readFile(indexFile, (err, content) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        });
    } else if (req.method === 'GET' && req.url === '/users') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(getUsers()));
    } else if (req.method === 'POST' && req.url === '/users') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            try {
                const newUser = JSON.parse(body);
                const users = getUsers();
                newUser.id = users.length ? users[users.length - 1].id + 1 : 1;
                users.push(newUser);
                saveUsers(users);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(newUser));
            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Invalid JSON');
            }
        });
    } else if (req.method === 'DELETE' && req.url.startsWith('/users/')) {
        const id = parseInt(req.url.split('/')[2]);
        let users = getUsers();
        const filteredUsers = users.filter(user => user.id !== id);
        if (users.length === filteredUsers.length) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('User not found');
        } else {
            saveUsers(filteredUsers);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('User deleted');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
