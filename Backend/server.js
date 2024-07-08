require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const  data=require('./Routes/data')
const  microsoft=require('./Routes/microsoft')
const  azure=require('./Routes/azure')
const  postData=require('./Routes/postData')
const users=require('./Routes/users')
const app = express();
const port = 3001;
const jwtSecret = process.env.JWT_SECRET;
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
//  // middleware
 
// Use the imported route
app.use('/data',data);
app.use('/microsoft/data',microsoft);
app.use('/azure/data',azure);
app.use('/azure/data',postData);
app.use('/api/user',users);
// Authentication Route
 
 
 
 
// Middleware to authenticate token and retrieve user info
const authenticateToken = (req, res, next) => {
    const token = req.query.token || req.headers['authorization'];
    if (!token) return res.sendStatus(401);
 
    jwt.verify(token.split(' ')[1], jwtSecret, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};
 
// Endpoint to get username
app.get('/user', authenticateToken, (req, res) => {
    const userId = req.user.id;
    db.query('SELECT username FROM users WHERE id = ?', [userId], (err, result) => {
        if (err) {
            res.status(500).json({ status: 'error', message: err.message });
            return;
        }
        if (result.length > 0) {
            res.json({ status: 'success', username: result[0].username });
        } else {
            res.status(404).json({ status: 'error', message: 'User not found' });
        }
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