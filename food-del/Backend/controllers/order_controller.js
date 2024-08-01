const userModel = require('../models/user_model');
const orderModel = require('../models/order_model');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";
    
    try {
        // Create a new order
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            payment:false
        });

        // Save the order to the database
        await newOrder.save();

        // Clear the user's cart
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Prepare line items for Stripe
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100, // Amount in cents
            },
            quantity: item.quantity,
        }));

        // Add delivery charges
        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100, // Delivery fee in cents
            },
            quantity: 1,
        });

        // Create a Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&order_id=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&order_id=${newOrder._id}`
        });

        // Respond with the session URL
        res.json({
            success: true,
            session_url: session.url,
        });

    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: err.message
        });
    }
}
exports.verifyOrder = async (req, res) => {
    const {success,order_id} = req.body;
    try {
        console.log("hi");
        console.log(success);
        
        if (success === "true") {
            await orderModel.findByIdAndUpdate(order_id, {payment: true});
            res.json({
                success: true,
                message: success.message
            })
        }
        else{
            await orderModel.findByIdAndDelete(order_id);
            res.json({
                success: false,
                message: "Not Paid"
            })
        }
    }
        catch(err){
            res.json({
                success: false,
                message: err.message
            })}
}

exports.displayOrders = async (req, res) => {
    try{
        const orders = await orderModel.find({userId: req.body.userId});
        res.json({
            success: true,
            data: orders
        })
    }
    catch(err){
        res.json({
            success: false,
            message: err.message
        })
    }
}
exports.getOrder = async (req, res) => {
    try{
        const orders = await orderModel.find();
        res.json({
            success: true,
            data: orders
        })
    }
    catch(err){
        res.json({
            success: false,
            message: err.message
        })
    }
}

exports.updatingStatus = async (req, res) => {
    try{
        await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status});
        res.json({
            success: true,
            message: "Updated Successfully"
        })
    }
    catch(err){
        res.json({
            success: false,
            message: err.message
        })
    }
}