const mongoose = require("mongoose");

const connnectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB) 
         console.log("Database connected successfully")
    } catch (error) {
        console.error("MongoDb Connection error",err);
    } 
}

module.exports = connnectDb;