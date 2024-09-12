const express = require('express')
const router = express.Router()
const Client = require('../models/Client')


router.post('', async(req,res)=>{
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
router.get('', async(req,res)=>{
    try {
        const clients = await Client.find(); // Fetch all resources from the database
        res.status(200).json(clients); // Send the resources as JSON        
    } catch (error) {
        res.status(400).json({message: error.message})
 
    }
    
})
router.get('/:id', async(req,res)=>{
    
})
router.put(':id', async(req,res)=>{
    
})
router.delete('/:id', async(req,res)=>{
    
})



module.exports = router