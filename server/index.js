const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config(); // Load environment variables
const userRoutes = require("../server/routes/userRoutes");
const clientRoutes = require("../server/routes/clientRoutes");
const csvRoutes = require("../server/routes/csvRouter");
const clientStatsRoutes = require('../server/routes/clientStatsRoutes');

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());

// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend
    credentials: true, // Allow cookies to be sent
}));

// MongoDB connection setup
const port = process.env.PORT || 5000;
const MONGO_URI = 'mongodb://localhost/dashBoard';
mongoose.connect(MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((error) => console.error(error));

// Routes
app.use('/api/Users', userRoutes);
app.use('/api/Clients', clientRoutes);
app.use('/api', csvRoutes);
app.use('/api', clientStatsRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`); // Log server status
});
