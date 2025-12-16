const express = require("express");
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require("../controllers/ProductController");
const Protect = require("../middilewares/protectMiddileware");

const router = express.Router();

router.post("/",createProduct)
router.get("/",Protect,getAllProducts)
router.get("/getproductBYid/:id",Protect,getProductById)
router.put("/update/:id",Protect,updateProduct);
router.delete("/delete/:id",Protect,deleteProduct)
 
module.exports = router