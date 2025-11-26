const express = require('express');
const router = express.Router();
const {verifyToken, }= require('../middleware/authMiddleware');
const {
  getCategories,
  getSubcategories,
  getProductsBySubcategory,getAllProducts,getTrendingProducts,getOnSaleProducts
} = require("../controllers/productsController");

router.get("/categories",verifyToken, getCategories);

router.get("/categories/:categoryId/subcategories",verifyToken, getSubcategories);

router.get("/subcategories/:subcategoryId/products",verifyToken, getProductsBySubcategory);

router.get("/allproducts",verifyToken, getAllProducts);

router.get("/trending",verifyToken, getTrendingProducts);

router.get("/onsale",verifyToken, getOnSaleProducts);

module.exports = router;