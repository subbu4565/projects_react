const connectDB = require('../Backend/config/db.js');
const foodRoute = require("./routes/foodRoute");
const userRoute = require("./routes/userRoute");
const cartRoute = require("./routes/cartRoute");
const orderRoute = require("./routes/orderRoute");

const cors = require('cors');
const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config()
app.use(cors());
app.use(express.json());
const path = require('path');

connectDB();

app.use("/api/food/user",userRoute)
app.use("/api/food/order",orderRoute)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/food",foodRoute)
app.use("/api/food",cartRoute)

module.exports = app;