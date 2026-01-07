const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
    name:{type: String, required:true},
    price: { type: Number,required: true,min: 0},
    brand:{type:String, required:true},
    fueltype: {
        type: String, enum: ["Petrol", "Diesel", "Electric", "CNG"]
    },
    seatingcapacity:{type:Number, required:true},
    wishlist:{type:Boolean, default:false}
})

module.exports = mongoose.model('car', carSchema);