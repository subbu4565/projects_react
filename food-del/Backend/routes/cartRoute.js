const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart_controller');
const token_auth=require('../middlewares/token_auth');


router.post('/cart/get',token_auth, cartController.getCart)
    .post('/cart/add',token_auth, cartController.addToCart)
    .post('/cart/delete',token_auth,cartController.removeFromCart);

module.exports = router;