const express = require('express');
const router = express.Router();
const {verifyToken, }= require('../middleware/authMiddleware');
const { getAllFaqs, getLogoImage, getSliderImages,getPaymentBtnImage,getPdfFileById
 } = require('../controllers/contentController');

router.get('/faqs',verifyToken, getAllFaqs);
// Fetch PDF for "About Cardify-AI" (id = 1)
router.get('/pdf-files/:id', getPdfFileById);

router.get('/sliderimages',verifyToken, getSliderImages);

router.get('/paymentbtnimage',verifyToken, getPaymentBtnImage);

module.exports = router;