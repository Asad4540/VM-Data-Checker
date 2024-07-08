// POST endpoint to handle form submission
const express = require('express');
const router = express.Router();
// const db = require('./db'); // Make sure to require your database connection module
const db=require('../Database/db')
router.post('/api/form', (req, res) => {
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
module.exports = router;