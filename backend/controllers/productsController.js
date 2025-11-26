const prisma = require('../prisma/client');

// 📌 Fetch ALL Categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await prisma.categories.findMany();
    res.json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Database error" });
  }
};

// 📌 Fetch Subcategories by Category ID
exports.getSubcategories = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const subcategories = await prisma.subcategories.findMany({
      where: { category_id: Number(categoryId) }, // use correct field name
    });

    res.json(subcategories);
  } catch (err) {
    console.error("Error fetching subcategories:", err);
    res.status(500).json({ error: "Database error" });
  }
};

// 📌 Fetch Products by Subcategory ID
exports.getProductsBySubcategory = async (req, res) => {
  try {
    const { subcategoryId } = req.params;

    const products = await prisma.products.findMany({
      where: { subcategory_id: Number(subcategoryId) }, // use correct field name
    });

    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Database error" });
  }
};

// =========================
// 📌 Get All Products
// =========================
// exports.getAllProducts = async (req, res) => {
//   try {
//     const products = await prisma.products.findMany();
//     res.status(200).json(products);
//   } catch (error) {
//     console.error("❌ Error fetching products:", error);
//     res.status(500).json({ error: "Failed to fetch products" });
//   }
// };
exports.getAllProducts = async (req, res) => {
  try {
    // Get pagination query params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await prisma.products.findMany({
      skip,
      take: limit,
      orderBy: { id: 'asc' }, // default ordering
    });

    // Check if there are more products
    const totalCount = await prisma.products.count();
    const hasMore = skip + products.length < totalCount;

    res.status(200).json({ products, hasMore });
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};


// =========================
// 📌 Get Trending Products
// =========================
exports.getTrendingProducts = async (req, res) => {
  try {
    const trending = await prisma.trendingProducts.findMany({
      orderBy: { added_at: "desc" },
      include: { product: true }, // join products table
    });

    const mapped = trending.map(item => item.product);

    res.status(200).json(mapped);
  } catch (error) {
    console.error("❌ Error fetching trending products:", error);
    res.status(500).json({ error: "Failed to fetch trending products" });
  }
};

// =========================
// 📌 Get On-Sale Products
// =========================
exports.getOnSaleProducts = async (req, res) => {
  try {
    const onSale = await prisma.onSaleProducts.findMany({
      orderBy: { added_at: "desc" },
      include: { product: true },
    });

    const formatted = onSale.map(item => ({
      ...item.product,
      new_price: item.new_price, // match Prisma field name casing
      added_at: item.added_at,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error("❌ Error fetching on-sale products:", error);
    res.status(500).json({ error: "Failed to fetch on-sale products" });
  }
};
