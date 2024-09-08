const mongoose = require('mongoose')

const userScehma = mongoose.Schema({

    username:{type:String, required:true},
    password:{type:String, required:true},
    email:{type:String, required:true},
    phone:{type:String, required:true}

})

module.exports = mongoose.model('User',userScehma)