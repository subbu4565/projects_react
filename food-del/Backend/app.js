const connectDB = require('../Backend/config/db.js');
const foodRoute = require("./routes/foodRoute");
const cors = require('cors');
const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config()
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/food",foodRoute)

module.exports = app;