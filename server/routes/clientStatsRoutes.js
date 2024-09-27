const express = require('express');
const router = express.Router();
const getClientsByDateRange = require('./clientDates');


// Endpoint for clients in the last 7 days
router.get('/clients-stats/last7days', async (req, res) => {
    try {
        const {dailyCounts,totalCount} = await getClientsByDateRange(7); // Retrieve counts for the last 7 days
        const labels = Array.from({ length: 7 }, (_, i) => `Day ${i + 1}`); // Labels for the last 7 days
        res.json({ labels, dailyCounts,totalCount }); // Send labels and counts back to the client
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

// Endpoint for clients in the last 30 days
router.get('/clients-stats/last30days', async (req, res) => {
    try {
        const {dailyCounts,totalCount} = await getClientsByDateRange(30); // Retrieve counts for the last 30 days
        const labels = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`); // Labels for the last 30 days
        res.json({ labels, dailyCounts,totalCount }); // Send labels and counts back to the client
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

// Endpoint for clients in the last 365 days
router.get('/clients-stats/last365days', async (req, res) => {
    try {
        const {dailyCounts,totalCount} = await getClientsByDateRange(365); // Retrieve counts for the last 365 days
        const labels = Array.from({ length: 365 }, (_, i) => `Day ${i + 1}`); // Labels for the last 365 days
        res.json({ labels, dailyCounts,totalCount }); // Send labels and counts back to the client
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;
