const prisma = require("../prisma/client");

// =========================
// 📌 Add to Cart (Create or Update)
// =========================
exports.addToCart = async (req, res) => {
  const user_id = req.user.user_id;
  const { id, quantity, name, price, image_url, selectedColor } = req.body;
  console.log("data in cart backend",id, quantity, name, price, image_url, selectedColor)
  try {
    // Check if product already exists in cart
    const existing = await prisma.cart.findFirst({
      where: { user_id, id },  // product id
    });

    if (existing) {
      // Update quantity
      await prisma.cart.update({
        where: { cart_id: existing.cart_id },
        data: { quantity: existing.quantity + quantity },
      });

      return res.json({ message: "Cart updated successfully" });
    }

    // Insert new item
    await prisma.cart.create({
      data: {
        user_id,
        id,
        quantity,
        name,
        price,
        image_url,
        selectedColor,
      },
    });

    res.json({ message: "Product added to cart successfully" });

  } catch (err) {
    console.error("❌ Error adding to cart:", err);
    res.status(500).json({ error: "Failed to add product to cart" });
  }
};

// =========================
// 📌 Get Cart Items for Logged-in User
// =========================
exports.getCartItems = async (req, res) => {
  const user_id = req.user.user_id;

  try {
    const cart = await prisma.cart.findMany({
      where: { user_id },
    });

    res.json(cart);
  } catch (err) {
    console.error("❌ Error fetching cart items:", err);
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
};

// =========================
// 📌 Update Quantity (NO need to send user_id)
// =========================
exports.updateCartItem = async (req, res) => {
  const user_id = req.user.user_id;
  const { quantity } = req.body;
  const { id } = req.params;

  try {
    const update = await prisma.cart.updateMany({
      where: { cart_id: Number(id), user_id },
      data: { quantity },
    });

    if (update.count === 0)
      return res.status(404).json({ message: "Cart item not found" });

    res.json({ message: "Quantity updated successfully" });

  } catch (err) {
    console.error("❌ Error updating cart item:", err);
    res.status(500).json({ error: "Failed to update cart item" });
  }
};

// =========================
// 📌 Delete Cart Item
// =========================
exports.deleteCartItem = async (req, res) => {
  const user_id = req.user.user_id;
  const { cart_id } = req.params;

  try {
    await prisma.cart.deleteMany({
      where: { cart_id: Number(cart_id), user_id },
    });

    res.json({ message: "Item removed successfully" });
  } catch (err) {
    console.error("❌ Error deleting cart item:", err);
    res.status(500).json({ error: "Failed to remove item from cart" });
  }
};

// =========================
// 📌 Save Address
// =========================
exports.saveAddress = async (req, res) => {
  const user_id = req.user.user_id;
  const { name, phone, city, address } = req.body;

  try {
    const saved = await prisma.addresses.create({
      data: { user_id, name, phone, city, address },
    });

    res.json({
      message: "Address saved successfully",
      address_id: saved.address_id,
    });

  } catch (err) {
    console.error("❌ Error saving address:", err);
    res.status(500).json({ error: "Database error" });
  }
};

// =========================
// 📌 Place Order
// =========================
exports.placeOrder = async (req, res) => {
  const user_id = req.user.user_id;

  const {
    name,
    phone,
    city,
    address,
    receipt_url,
    subtotal,
    shipping_charges,
    total_amount,
    cart_items,
  } = req.body;

  try {
    // Create order
    const order = await prisma.appOrders.create({
      data: {
        user_id,
        name,
        phone,
        city,
        address,
        receipt_url,
        subtotal,
        shipping_charges,
        total_amount,
        status: "IN_PROGRESS",
      },
    });

    // Prepare item list
    const itemData = cart_items.map((item) => ({
      order_id: order.order_id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    // Insert order items
    await prisma.appOrderItems.createMany({
      data: itemData,
    });

    res.json({
      message: "Order placed successfully!",
      order_id: order.order_id,
    });

  } catch (err) {
    console.error("❌ Error placing order:", err);
    res.status(500).json({ error: "Database error" });
  }
};
