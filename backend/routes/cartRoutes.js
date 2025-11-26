const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');

const {
  addToCart,
  getCartItems,
  updateCartItem,
  deleteCartItem,
  saveAddress,
  placeOrder
} = require("../controllers/cartController");

// =============================
// ✔ Add to Cart (Create / Update)
// =============================
router.post("/addtocart", verifyToken, addToCart);

// =============================
// ✔ Get all cart items (auto user_id)
// =============================
router.get("/cartitems", verifyToken, getCartItems);

// =============================
// ✔ Update cart item quantity
// =============================
router.put("/cart/:id", verifyToken, updateCartItem);

// =============================
// ✔ Delete cart item (only cart_id)
// =============================
router.delete("/cart/:cart_id", verifyToken, deleteCartItem);

// =============================
// ✔ Save address
// =============================
router.post("/save_address", verifyToken, saveAddress);

// =============================
// ✔ Place order
// =============================
router.post("/orders", verifyToken, placeOrder);

module.exports = router;
