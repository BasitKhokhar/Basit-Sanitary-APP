
const prisma = require('../prisma/client');
//about sliderimages
exports.getSliderImages = async (req, res) => {
  try {
    const images = await prisma.sliderImages.findMany(); 
    res.json(images);
  } catch (error) {
    console.error("Error fetching slider images:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// ✅ Fetch PDF and open in browser (About or Privacy)
exports.getPdfFileById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const file = await prisma.appPdfFiles.findUnique({ where: { id } });

    if (!file) {
      return res.status(404).json({ error: "PDF not found" });
    }

    // 🔁 Redirect directly to Firebase URL
    return res.redirect(file.url);
  } catch (error) {
    console.error("Error fetching PDF file:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getPrivacyPolicy = async (req, res) => {
  try {
    const policy = await prisma.privacyPolicy.findFirst();
    res.json(policy);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get About App by id
exports.getAboutApp = async (req, res) => {
  try {
    const about = await prisma.aboutApp.findFirst();
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//about FAQs
exports.getAllFaqs = async (req, res) => {
  try {
    const faqs = await prisma.fAQ.findMany(); // Removed orderBy
    console.log("allfaqs in backend API", faqs);
    res.json(faqs);
  } catch (err) {
    console.error("getAllFaqs error:", err);
    res.status(500).json({ error: "Failed to load FAQs" });
  }
};

//about paymentbtn
exports.getPaymentBtnImage = async (req, res) => {
  try {
    const image = await prisma.sliderImages.findUnique({
      where: { id: 3 }, 
    });

    if (image) {
      console.log("Payment Button Image Data:", image);
      res.json(image);
    } else {
      res.status(404).json({ message: "Payment image not found" });
    }
  } catch (error) {
    console.error("Error fetching payment button image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 📌 Get all brands
// =========================
exports.getBrands = async (req, res) => {
  try {
    const brands = await prisma.brands.findMany();
    res.status(200).json(brands);
  } catch (error) {
    console.error("❌ Error fetching brands:", error);
    res.status(500).json({ error: "Failed to fetch brands" });
  }
};

// =========================
// 📌 Get first 2 customer support options
// =========================
exports.getFirstColumnData = async (req, res) => {
  try {
    const firstColumn = await prisma.customer_supportoptions.findMany({
      take: 2,
    });
    res.status(200).json(firstColumn);
  } catch (error) {
    console.error("❌ Error fetching first 2 rows:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

// =========================
// 📌 Get remaining customer support options
// =========================
exports.getSecondColumnData = async (req, res) => {
  try {
    const secondColumn = await prisma.customer_supportoptions.findMany({
      skip: 2,
      take: 100,
    });
    res.status(200).json(secondColumn);
  } catch (error) {
    console.error("❌ Error fetching next rows:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};