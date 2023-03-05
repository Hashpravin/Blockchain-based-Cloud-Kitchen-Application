const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({

    orderId:{
        type:String
    },
    dishes:{
        type:[mongoose.Types.ObjectId],
        ref:'dish'
    },
    price:{
        type:Number
    },
    paymentType:{
        type:String
    },
    paymentStatus:{
        type:String
    }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
