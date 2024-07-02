require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Authentication Route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
        
        if (error) throw error;
        if (results.length === 0) {
            return res.status(401).json({ status: 'error', message: 'Invalid username or password' });
        }

        const user = results[0];

        if (password !== user.password) {
            return res.status(401).json({ status: 'error', message: 'Invalid username or password' });
          }
      
          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
          res.json({ status: 'success', message: 'Login successful', token });
        });
      });


// Middleware to protect routes
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ status: 'error', message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).json({ status: 'error', message: 'Failed to authenticate token' });
        }

        req.userId = decoded.id;
        next();
    });
};

// Protected route example
app.get('/dashboard', verifyToken, (req, res) => {
    res.json({ message: 'Welcome to the Dashboard!', userId: req.userId });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});