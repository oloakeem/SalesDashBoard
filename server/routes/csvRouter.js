// csvRoutes.js
const express = require('express');
const router = express.Router();
const Data = require('../models/Client'); // Your Mongoose model

// POST route for uploading CSV
router.post('/upload-csv', async (req, res) => {
  try {
    const csvData = req.body.data;
    // Parse CSV data
    const parsedData = csvData.map(row => ({
        name: row.name, // Adjust to match CSV column header for name
        email: row.email, // Adjust to match CSV column header for email
        phone: row.phone, // Adjust to match CSV column header for phone
        membershipType: parseInt(row.membershipType, 10), // Convert to number
        startDate: new Date(row.startDate), // Convert to Date object
        paymentMethod: row.paymentMethod, // Adjust to match CSV column header for paymentMethod
    }));
    
    // Insert data into MongoDB
    await Data.insertMany(parsedData);
    res.status(200).send('Data inserted successfully');
  } catch (error) {
    console.error('Error processing CSV:', error);
    res.status(500).send('Error processing CSV');
  }
});

module.exports = router;
