const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
require('dotenv').config();

const app = express();
app.use(express.json()); // Parse JSON requests

const cors = require('cors');
app.use(cors()); // Allow all origins (you may want to configure this for production)

// Connect to MongoDB
// mongoose
//     .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch((err) => console.error('Failed to connect to MongoDB:', err));

mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Connected to MongoDB');

        // Create an admin user after a successful connection
        try {
            const existingAdmin = await User.findOne({ email: 'admin1@example.com' });
            if (!existingAdmin) {
                const adminUser = new User({
                    name: 'admin1',
                    email: 'admin1@example.com',
                    password: 'admin123',
                    role: 'admin'
                });
                await adminUser.save();
                console.log('Admin user created successfully');
            } else {
                console.log('Admin user already exists');
            }
        } catch (error) {
            console.error('Error creating admin user:', error.message);
        }
    })
    .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Route: Create user (admin only)
app.post('/users', async (req, res) => {
    try {
        // TODO: Add authentication middleware to ensure only admins can access this route
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Route: Get all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Route: Update user
app.put('/users/:id', async (req, res) => {
    try {
        const { name, email, password, role, age } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id, 
            { name, email, password, role, age }, 
            { new: true, runValidators: true }
        );
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send(user);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Route: Delete user
app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send(user);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Route: User login
app.post('/login', async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await User.findOne({ name });
        if (!user || user.password !== password) {
            return res.status(401).send({ error: 'Invalid credentials' });
        }
        res.send({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

