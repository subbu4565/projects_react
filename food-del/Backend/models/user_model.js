const mongoose = require('mongoose');
const food_model = require("./food_model");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true,
    },
    cartData:{
        type: Object,
        default:{}
    }
},{minimize: false})
const userModel=mongoose.models.user || mongoose.model("User",userSchema);
module.exports=userModel;