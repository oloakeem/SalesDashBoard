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
    
})
router.get('/:id', async(req,res)=>{
    
})
router.put(':id', async(req,res)=>{
    
})
router.delete('/:id', async(req,res)=>{
    
})



module.exports = router