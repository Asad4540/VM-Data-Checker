require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
// const bcrypt = require('bcryptjs');
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

//Ravidra code

// Protected route example
app.get('/dashboard', verifyToken, (req, res) => {
    res.json({ message: 'Welcome to the Dashboard!', userId: req.userId });
});

// POST endpoint to handle form submission
app.post('/api/form', (req, res) => {
    const {product, firstName, lastName, email, companyName, jobTitle, country, challenges, technologyRefresh, targetEnvironment, migrationManager, lastRefresh, openChallenges, consentCheckbox } = req.body;

    const query = `
        INSERT INTO data 
        (product,firstName, lastName, email, companyName, jobTitle, country, challenges, technologyRefresh, targetEnvironment, migrationManager, lastRefresh, openChallenges, consentCheckbox) 
        VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [product,firstName, lastName, email, companyName, jobTitle, country, challenges, technologyRefresh, targetEnvironment, migrationManager, lastRefresh, openChallenges, consentCheckbox ? 1 : 0], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Server error');
            return;
        }
        res.status(200).send('Form submitted successfully');
    });
});

// GET endpoint to retrieve form data
app.get('/api/formdata', (req, res) => {
    const query = 'SELECT * FROM data';

    db.query(query, (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Server error');
            return;
        }
        res.status(200).json(result);
    });
});


// CORS headers for handling preflight requests
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

//Ravidra code

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});