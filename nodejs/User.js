const mongoose = require('mongoose');


const userSchema= new mongoose.Schema({
    name:String,
    email:String,
    date:Date
})

const user=mongoose.model("User", userSchema);

module.exports = user;