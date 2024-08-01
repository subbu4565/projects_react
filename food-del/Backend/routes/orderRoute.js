const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order_controller');
const tokenAuth = require('../middlewares/token_auth');

router.post('',tokenAuth,orderController.placeOrder)
router.post("/verify",orderController.verifyOrder)
router.post("/orders",tokenAuth,orderController.displayOrders)
router.get("/orders/list",orderController.getOrder)
router.post("/status",orderController.updatingStatus)

module.exports = router;