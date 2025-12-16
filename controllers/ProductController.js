const Product = require("../models/productSchema");
const createProduct = async (req, res, next) => {
    try {
        // example early error path (uncomment if you need an explicit early failure)
        // const err = new Error("something went wrong!"); err.statusCode = 400; throw err;

        const { name, description, price, category, stock, image } = req.body;
        if (!name || !description || !price || !category) {
            const err = new Error("All fields are required");
            err.statusCode = 400;
            throw err; // will be handled by the error middleware
        }

        // use Mongoose Model.create to create and save a document
        const product = await Product.create({
            name,
            description,
            price,
            category,
            stock,
            image,
        });

        res.status(201).json(product);
    } catch (error) {
        // pass the error to the centralized error handler
        next(error);
    }
};

const getAllProducts = async(req,res) => {
try {
    const products = await Product.find()
    res.status(200).json(products)
} catch (error) {
    res.status(500).json({message: error.message})
}
}

const getProductById = async(req, res) => {
   try {
    const product = await Product.findById(req.params.id);
    if(!product){
        res.status(404).json({message:"Product is not available"})
    }
    res.status(200).json(product)
   } catch (error) {
    res.status(500).json({message:error.message})
   }
}

const updateProduct = async (req,res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body,{
            new:true,
        });
        if(!updatedProduct) return res.status(404).json({message: "product not found"})
        res.json(updatedProduct);    
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const deleteProduct = async(req,res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if(!deletedProduct){
            return res.status(404).json({message:"Product not available"})
        }
        res.status(200).json({message:"product got ddeleted successfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const ProductDetails = (req, res) => {

}

module.exports = {createProduct ,getAllProducts,getProductById,updateProduct,deleteProduct}