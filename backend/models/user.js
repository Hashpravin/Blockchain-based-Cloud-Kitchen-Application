const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fname:{
        type:String
    },
    lname:{
        type:String
    },
    email: {
        type: mongoose.Schema.Types.String,
    },
    userName: {
        type: mongoose.Schema.Types.String,
    },
    gender: {
        type: mongoose.Schema.Types.String,
    },
    password: {
        type: mongoose.Schema.Types.String,
    },
    securityQuestion: {
        type: mongoose.Schema.Types.String,
    },
    securityAnswer: {
        type: mongoose.Schema.Types.String,
    },
    profilePhoto: {
        type: mongoose.Schema.Types.String,
    },
    userDescription: {
        type: mongoose.Schema.Types.String,
    },
    location:{
        type:String
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
