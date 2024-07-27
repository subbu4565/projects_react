const food_model=require('../models/food_model');
const fs = require('fs');
const mongoose=require('mongoose');

exports.addFood = async (req,res) => {
    let fileName=req.file.filename
    const food=new food_model({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        image:fileName,
        category:req.body.category
    })
    try{
        await food.save()
        res.json({
            success: true,
            message:"Added Successfully",
        })
    }
    catch(err){
        console.log(err);
        res.json({
            success: false,
            message:err.message,
        })
    }
};
exports.listFood = async (req,res) => {
        try{
            const foods = await food_model.find()
            res.json({
                success: true,
                message:"Found Successfully",
                data:{
                    foods:foods
                }
            })
        }
        catch(err){
            console.log(err);
            res.json({
                success: false,
                message:err.message
            })
        }
}

exports.deleteFood = async (req,res) => {
        try{
            const image=await food_model.findById(req.body.id)
            fs.unlink(`./uploads/${image}`, err => {
                if(err){
                    console.log(err)
                }
            })
            await food_model.findByIdAndDelete(req.body.id)
            res.json({
                success: true,
                message:"Deleted Successfully",
            })
        }
        catch(err){
            console.log(err);
            res.json({
                success: false,
                message:err.message
            })
        }
}

