const express = require('express');
const router = express.Router();
const {verifyToken, }= require('../middleware/authMiddleware');
const { getAllFaqs, getLogoImage, getSliderImages,getPaymentBtnImage,getPdfFileById,getBrands,getFirstColumnData,getSecondColumnData
 } = require('../controllers/contentController');

router.get('/faqs',verifyToken, getAllFaqs);
// Fetch PDF for "About Cardify-AI" (id = 1)
router.get('/pdf-files/:id', getPdfFileById);

router.get('/sliderimages',verifyToken, getSliderImages);

router.get('/paymentbtnimage',verifyToken, getPaymentBtnImage);
// 📌 Get all brands
router.get("/brands", getBrands);

// 📌 Get first 2 customer support options
router.get("/first_column_data", getFirstColumnData);

// 📌 Get remaining customer support options
router.get("/second_column_data", getSecondColumnData);

module.exports = router;