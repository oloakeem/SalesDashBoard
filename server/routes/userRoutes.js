const express = require('express')
const router = express.Router()
const User = require('../models/Users')
const bcrypt = require('bcrypt')

//Post
router.post('/', async (req, res) => {
    try {
        const { password, ...rest } = req.body;

        // Hash the password using bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

      
        const newUser = new User({
            ...rest,        
            password: hashedPassword 
        });
        await newUser.save();
        const { password: _, ...userWithoutPassword } = newUser.toObject();
        res.status(201).json(userWithoutPassword);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
//POST LOGIN
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user by username (or any other unique identifier like username)
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Optionally, you could generate a JWT token here for session management (for example, using `jsonwebtoken`)
        res.status(200).json({ message: 'Login successful', userId: user._id });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
//Get
router.get('', async(req,res)=>{
    try {
        const users = await User.find(); // Fetch all resources from the database
        res.status(200).json(users); // Send the resources as JSON        
    } catch (error) {
        res.status(400).json({message: error.message})
 
    }
    
})
//Get byID

//Put byID

//Delete byID



module.exports = router