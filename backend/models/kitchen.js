const mongoose = require('mongoose');

const kitchenSchema = mongoose.Schema({

    dishes:{
        type:[mongoose.Types.ObjectId],
        ref:'dish'
    },
    offer:{
        type:Number
    },
    location:{
        type:String
    }
});

const Kitchen = mongoose.model("Kitchen", kitchenSchema);

module.exports = Kitchen;
