const express = require('express')
const router = express.Router()
const User = require('../models/Users')


//Post
router.post('/',async(req,res)=>{
    try {
        const newUserData = {
            ...req.body
        }
          const newUser = new User(newUserData)
         await newUser.save()
    res.status(201).json(newUser);

    } catch (error) {
        res.status(400).json({message: error.message})
    }
})
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