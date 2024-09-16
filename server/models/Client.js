const mongoose = require('mongoose')

const ClientSchema = mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    phone:{type:String, required:true},
    membershipType:{type:Number, enum: [70,106,180], required:true},
    startDate:{type:String, required:true},
    paymentMethod:{type:String, required:true},

})

module.exports = mongoose.model("Client",ClientSchema)