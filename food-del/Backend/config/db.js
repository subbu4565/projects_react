const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const connect_db = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB Connected!');
    }
    catch(err){
        console.log(err);
    }

}
module.exports = connect_db;