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
      name: row.name, // Name
      email: row.email, // Email
      phone: row.phone, // Phone
      address: row.address, // Address
      height: row.height, // Height
      weight: row.weight, // Weight
      membershipType: parseInt(row.membershipType, 10), // Membership Type as a number
      startDate: new Date(row.startDate), // Start Date as a Date object
      paymentMethod: row.paymentMethod, // Payment Method
      targetGoals: { // Group boolean fields into targetGoals object
        yoga: row.yoga === 'true', // Convert to boolean
        cardio: row.cardio === 'true', // Convert to boolean
        aerobics: row.aerobics === 'true', // Convert to boolean
        physicalFitness: row.physicalFitness === 'true', // Convert to boolean
        fatLoss: row.fatLoss === 'true', // Convert to boolean
        freeHand: row.freeHand === 'true', // Convert to boolean
        muscleBuilding: row.muscleBuilding === 'true', // Convert to boolean
        endurance: row.endurance === 'true', // Convert to boolean
    },
      surgeries: row.surgeries, // Surgeries
      medication: row.medication, // Medication
      accidents: row.accidents // Accidents
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
