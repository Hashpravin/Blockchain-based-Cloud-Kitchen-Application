const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({

    name:{
        type:String
    },
    type:{
        type:String
    },
    price:{
        type:Number
    },
    description:{
        type:String
    },
    rating:{
        type:Number
    },
    orderCount:{
        type:Number
    },
    offer:{
        type:Number
    }
});

const Dish = mongoose.model("Dish", dishSchema);

module.exports = Dish;
