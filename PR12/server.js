require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();

// Add timeout middleware
app.use((req, res, next) => {
    res.setTimeout(5000, () => {
        res.status(408).send('Request Timeout');
    });
    next();
});

// Add request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Parse JSON with size limit
app.use(express.json({ limit: '10kb' }));

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to User Profile Manager API',
        endpoints: {
            createUser: 'POST /users',
            getAllUsers: 'GET /users',
            getUserById: 'GET /users/:id',
            updateUser: 'PUT /users/:id',
            deleteUser: 'DELETE /users/:id',
            findUsersByAge: 'GET /users/age/:age'
        }
    });
});

// MongoDB Connection with better error handling
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Successfully connected to MongoDB.');
        console.log('Connection URI:', process.env.MONGODB_URI);
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        console.error('Please make sure:');
        console.error('1. MongoDB is installed');
        console.error('2. MongoDB service is running');
        console.error('3. The connection URI is correct');
        process.exit(1);
    });

// Create a new user with validation
app.post('/users', async (req, res) => {
    try {
        // Validate request body
        if (!req.body || !req.body.name || !req.body.email || !req.body.age) {
            return res.status(400).json({
                error: 'Missing required fields',
                required: ['name', 'email', 'age']
            });
        }

        const user = new User(req.body);
        await user.save();
        console.log('User created:', user);
        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(400).json({ 
            error: error.message,
            details: 'Please check your request body format'
        });
    }
});

// Get all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        console.log('All users:', users);
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get user by ID
app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: error.message });
    }
});

// Update user
app.put('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(400).json({ error: error.message });
    }
});

// Delete user
app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: error.message });
    }
});

// Find users by age
app.get('/users/age/:age', async (req, res) => {
    try {
        const users = await User.find({ age: req.params.age });
        res.json(users);
    } catch (error) {
        console.error('Error fetching users by age:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 