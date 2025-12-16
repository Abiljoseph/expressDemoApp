const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please add product name"]
    },
    description:{
        type:String,
        required:[true,"enter your product description"]
    },
    price:{
        type:Number,
        required:[true,"please enter the price of the product"]
    },
    category:{
        type:String,
        required:[true,"please specify the product category"]
    },
    stock:{
        type:Number,
        default:0
    },
    image:{
        type:String,
        default:"https://e7.pngegg.com/pngimages/779/310/png-clipart-computer-icons-basket-shopping-cart-shopping-cart-handle-basket.png"
    },
},
{
    timestamps:true
}
);

const Product = mongoose.model("Product",productSchema)

module.exports = Product
