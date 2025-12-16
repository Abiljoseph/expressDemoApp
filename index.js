const express = require("express");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes")
const connnectDb = require("./config/db");
const morgan = require("morgan");
const errorHandler = require("./middilewares/errorHandler");
require('dotenv').config();
  
const app = express();
const PORT = 3000;
connnectDb(); 
app.use(express.json())
app.use(morgan("developmnt"))
app.use((req,res,next) => {
    console.log(`${req.method} ${req.url} at ${new Date().toISOString()}`)
next();
})

app.use("/auth",authRoutes)
app.use("/product",productRoutes)
app.use(errorHandler);

app.listen(PORT,() => {
    console.log(`server is running on port ${PORT}`)
})

