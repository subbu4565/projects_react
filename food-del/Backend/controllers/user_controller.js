const userModel = require('./../models/user_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const createToken= (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET);
}

exports.registerUser = async (req, res) => {
   const { name, email, password } = req.body;
   try{
       if (!email) {
           return res.status(400).json({ message: 'Email is required' });
       }

       // Check if password is present and not undefined
       if (!password) {
           return res.status(400).json({ message: 'Password is required' });
       }

       //checking user exists or not
       const user = await userModel.findOne({email});
       if(user){
           return res.status(400).json({message:"User already exists"});
       }
       //validating Email and password

       if(!validator.isEmail(email)){
           return res.status(400).json({message:"Email already exists"});
       }
       if(password.length < 8){
           return res.status(400).json({message:"Password must be at least 8 characters"});
       }
       //creating user

       const hashedPass = await bcrypt.hash(password, 10)
       const newUser = await userModel.create({
           name:name,
           email:email,
           password:hashedPass
       })
        console.log(newUser._id)
       const jwtToken = createToken(newUser._id)
       res.status(201).json({
           success: true,
           message:"Successfully added Successfully",
           jwtToken: jwtToken,
           newUser
       });
   }
   catch(err){
       console.log(err);
       res.json({
           success: false,
           message:err.message
       })
   }

}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try{
        const user = await userModel.findOne({email});
        console.log(user);
        if(!user){
            return res.status(400).json({message:"User Not existed"});
        }
        if(await bcrypt.compare(password, user.password)){
            console.log(user)
            const jwtToken=createToken(user._id)
            res.json({
                success: true,
                message:"Successfully logged in",
                jwtToken:jwtToken,
                user:user
            })
        }
    }
    catch(err){
        console.log(err);
        res.json({
            success: false,
            message:err.message
        })
    }

}