const userModel=require('../models/user_model');


exports.addToCart= async(req,res)=>{
    try{
        let userData=await userModel.findOne({_id:req.body.userId});
        let cartData=await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId]=1
        }
        else{
            cartData[req.body.itemId]=cartData[req.body.itemId] + 1;
        }
        console.log(cartData);
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({
            success:true,
            data:userData
        });

    }
    catch(err){
        res.status(400).send({
            success:false,
            message:err.message
        })
    }
}
exports.removeFromCart=async(req,res)=>{
    try{
        let userData=await userModel.findOne({_id:req.body.userId});
        let cartData=await userData.cartData
        if(cartData[req.body.itemId]){
            cartData[req.body.itemId]-=1
        }
        else{
            cartData={}
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({
            success:true,
            data:cartData});
    }
    catch(err){
        res.json({
            success:false,
            message:err.message
        })
    }
}
exports.getCart=async(req,res)=>{
    try{
        let userData=await userModel.findOne({_id:req.body.userId});
        let cartData=await userData.cartData;
        res.json({
            success:true,
            data:cartData
        })
    }
    catch(err){
        res.json({
            success:false,
            message:err.message
        })
    }

}