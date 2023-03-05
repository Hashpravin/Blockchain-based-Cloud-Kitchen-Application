const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({

    user:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    orders:{
        type:[mongoose.Types.ObjectId],
        ref:'orders'
    }
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
