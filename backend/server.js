const express = require("express");
const { createServer } = require("http");
const app = express();
const routes = require("./routes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");


dotenv.config();
// Access the port Number
port = process.env.PORT || 5000;
console.log(port);

// Database url
const dataBaseString = process.env.MONGODB_URI ;
console.log(dataBaseString);

// JWT
app.use(bodyParser.urlencoded({ extended: false }));

//log to check the status of app
app.use(bodyParser.json())

//log to check is the

mongoose.connect(dataBaseString)
.then((resp)=>{
    console.log('Mongodb-Database connected successfully !!!');
})
.catch((err)=>console.log(err));


app.listen(port, function () {
    console.log("App Started at port " + port)
});
