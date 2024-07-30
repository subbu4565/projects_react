const express=require('express');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');

app=express();

const users=[]

app.use(express.json());
dotenv.config();

app.get('/users',(req,res)=>{
    res.json(users);
})

app.post("/users",async (req,res)=>{
    try{
        const salt=await bcrypt.genSalt()
        const hashedPassword=await bcrypt.hash(req.body.password, salt)
        const name=req.body.name
        users.push({name:name, password:hashedPassword})
        res.status(201).send()
    }
    catch(e){
        console.log(e);
    }
})

app.post('/users/login',async (req,res)=>{
    const username=users.find(user=>user.name===req.body.name)
    if(username===null){
        return res.status(400).send("User not found")
    }
    try{
        if(await bcrypt.compare(req.body.password, username.password)){
            //res.json(username)
            // res.send("Success"
            const jsonwebtoken=jwt.sign({name:req.body.name},process.env.ACCESS_TOKEN_SECRET)
            res.json({jsonwebtoken:jsonwebtoken})
        }
        else{
            res.send("Not Allowed")
        }
    }
    catch(e){
        console.log(e); 
        res.status(500).send()
    }
})

app.listen(8080,()=>{
    console.log("Server is running on port 8080");
})