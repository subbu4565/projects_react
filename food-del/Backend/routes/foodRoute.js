const express = require('express');
const Food=require('./../controllers/food_controller')
const route=express.Router();
const multer=require('multer');

const storage=multer.diskStorage({
    destination: 'uploads',
    filename:function(req,file,cb){
        return cb(null,`${Date.now()}${file.originalname}`);
    }
})
const upload=multer({storage:storage});

route.post('/add',upload.single("image"),Food.addFood)
route.get('/list',Food.listFood)
route.delete('/delete/:id',Food.deleteFood)


module.exports = route