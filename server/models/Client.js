const mongoose = require('mongoose')

const targetGoalsSchema = new mongoose.Schema({
    yoga: { type: Boolean, default: false },
    cardio: { type: Boolean, default: false },
    aerobics: { type: Boolean, default: false },
    physicalFitness: { type: Boolean, default: false },
    fatLoss: { type: Boolean, default: false },
    freeHand: { type: Boolean, default: false },
    muscleBuilding: { type: Boolean, default: false },
    endurance: { type: Boolean, default: false },
  });
const ClientSchema = mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    phone:{type:String, required:true},
    address:{type:String, required:true},
    height:{type:String, required:true},
    weight:{type:String, required:true},
    membershipType:{type:Number, enum: [70,106,180], required:true},
    startDate:{type:String, required:true},
    paymentMethod:{type:String, required:true},
    targetGoals: targetGoalsSchema, // Nested schema for target goals

    surgeries: { type: String }, 
    medication: { type: String },
    accidents: { type: String },

})

module.exports = mongoose.model("Client",ClientSchema)