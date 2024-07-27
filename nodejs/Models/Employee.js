const mongoose = require('mongoose');

const employeeSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    city:{
        type: String,
        default:false
    },
    phone:{
        type:Number
    }

})

const Employee=mongoose.model('Employee',employeeSchema);
module.exports = Employee;