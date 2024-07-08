const express = require('express');
const router = express.Router();
// const db = require('./db'); // Make sure to require your database connection module
const db= require('../Database/db_micro')
// GET endpoint to retrieve form data
router.get('/api/micro', (req, res) => {
    const query = 'SELECT * FROM microsoft_data';
 
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Server error');
            return;
        }
        res.status(200).json(result);
    });
});
 
module.exports = router;