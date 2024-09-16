const express = require('express');
const router = express.Router();
const Client = require('../models/Client');

// Endpoint to get client count by membership type
// Helper function to get clients based on date range
const getClientsByDateRange = async (days) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    return await Client.countDocuments({
      startDate: { $gte: startDate }
    });
  };
  
  // Endpoint for clients in the last 7 days
  app.get('/clients-stats/last7days', async (req, res) => {
    try {
      const count = await getClientsByDateRange(7);
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: 'Server Error' });
    }
  });
  
  // Endpoint for clients in the last 30 days
  app.get('/clients-stats/last30days', async (req, res) => {
    try {
      const count = await getClientsByDateRange(30);
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: 'Server Error' });
    }
  });
  
  // Endpoint for clients in the last 365 days
  app.get('/clients-stats/last365days', async (req, res) => {
    try {
      const count = await getClientsByDateRange(365);
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: 'Server Error' });
    }
  });
module.exports = router;
