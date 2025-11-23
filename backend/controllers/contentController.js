
const prisma = require('../prisma/client');
//about sliderimages
exports.getSliderImages = async (req, res) => {
  try {
    const images = await prisma.sliderimages.findMany(); 
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
    const file = await prisma.apppdffiles.findUnique({ where: { id } });

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
    const image = await prisma.sliderimages.findUnique({
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

