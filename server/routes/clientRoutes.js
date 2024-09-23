const express = require('express')
const router = express.Router()
const Client = require('../models/Client')
const authenticateJWT = require("../middleware/authenticationJWT")


router.post('',authenticateJWT, async(req,res)=>{
    try {
        const newClientData = {
            ...req.body
        }
          const newClient = new Client(newClientData)
         await newClient.save()
    res.status(201).json(newClient);

    } catch (error) {
        res.status(400).json({message: error.message})
    }
})
router.get('',authenticateJWT, async(req,res)=>{
    try {
        const clients = await Client.find(); // Fetch all resources from the database
        res.status(200).json(clients); // Send the resources as JSON        
    } catch (error) {
        res.status(400).json({message: error.message})
 
    }
    
})
router.get('/:id',authenticateJWT, async (req, res) => {
    try {
        // Use req.params.id to get the client by ID from the URL
        const client = await Client.findById(req.params.id); 
        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }
        res.status(200).json(client); // Send the client data as JSON        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put(':id', async(req,res)=>{
    
})
router.delete('/:id', async(req,res)=>{
    
})



module.exports = router