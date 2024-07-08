const express = require('express');
const router = express.Router();
require('dotenv').config();
// const db = require('./db'); // Make sure to require your database connection module
const db=require('../Database/db')
const jwt = require('jsonwebtoken');
// const jwtSecret = process.env.JWT_SECRET;
// GET endpoint to retrieve form data
router.post('/login', (req, res) => {
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
router.get('/dashboard', verifyToken, (req, res) => {
    res.json({ message: 'Welcome to the Dashboard!', userId: req.userId });
});
 
module.exports = router;