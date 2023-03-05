const mongoose = require('mongoose');

const kownerSchema = mongoose.Schema({

    user:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    kitchens:{
        type:[mongoose.Types.ObjectId],
        ref:'kitchen'
    }
});

const Kowner = mongoose.model("Kowner", kownerSchema);

module.exports = Kowner;
