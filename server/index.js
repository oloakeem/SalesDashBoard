const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors');

require('dotenv').config(); // Load environment variables
const userRoutes = require("../server/routes/userRoutes")
const clientRoutes = require("../server/routes/clientRoutes")



app.use(express.json()) // Middleware to parse JSON request bodies


// MongoDB connection setup // Connect to MongoDB
const port = process.env.PORT || 5000; // Define the port to listen on
const MONGO_URI = 'mongodb://localhost/dashBoard'; // Your MongoDB connection string
mongoose.connect(MONGO_URI).then(()=> console.log("MongoDB Connected")).catch((error)=>console.error(error))


app.use(express.json());
app.use(cors());
app.use('/api/Users', userRoutes); // Use routes
app.use('/api/Clients', clientRoutes); // Use routes


app.listen(port,()=>{
    console.log(`Server running on port ${port}`); // Log server status)
})