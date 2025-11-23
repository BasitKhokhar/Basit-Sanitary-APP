require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma/client');

//  Helpers 
const generateAccessToken = (user) =>
  jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, {
    expiresIn: "5m",
  });

const generateRefreshToken = (user) =>
  jwt.sign({ userId: user.user_id }, process.env.REFRESH_SECRET, {
    expiresIn: "7d",
  });

// Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password, phone, termsStatus } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await prisma.users.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: hashed,
        phone,
        termsStatus,
      },
    });

    res.json({
      message: "User registered successfully",
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        termsStatus: user.termsStatus,
      },
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Login 
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res.status(400).json({ message: "Email & password required" });

    const user = await prisma.users.findUnique({ where: { email } });

    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);

    if (!match)
      return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await prisma.users.update({
      where: { user_id: user.user_id },
      data: { refreshToken },
    });

    res.json({
      accessToken,
      refreshToken,
      userId: user.user_id,
      email: user.email,
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Refresh Token
exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken)
    return res.status(401).json({ message: "No refresh token" });

  try {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

    const user = await prisma.users.findUnique({
      where: { user_id: payload.userId },
    });

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    await prisma.users.update({
      where: { user_id: user.user_id },
      data: { refreshToken: newRefreshToken },
    });

    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};

// Logout 
exports.logout = async (req, res) => {
  const { userId } = req.body;

  await prisma.users.update({
    where: { user_id: userId },
    data: { refreshToken: null },
  });

  res.json({ message: "Logged out successfully" });
};
















// require('dotenv').config();
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const prisma = require('../prisma/client');

// exports.signup = async (req, res) => {
//   try {
//     const { name, email, password, phone, termsStatus } = req.body;
//     console.log("Signup data:", { name, email, password, phone, termsStatus });

//     const hashed = await bcrypt.hash(password, 10);

//     const user = await prisma.users.create({
//       data: {
//         name,
//         email,
//         password: hashed,
//         phone,
//         termsStatus,
//       },
//     });

//     console.log("User created:", user);
//     // res.json({ message: "User registered successfully", user });
//     res.json({
//       message: "User registered successfully",
//       user: {
//         user_id: user.user_id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         termsStatus: user.termsStatus
//       }
//     });
//   } catch (err) {
//     console.error("Signup Error:", err);
//     res.status(500).json({ error: err.message });
//   }
// };


// // --- Helpers ---
// const generateAccessToken = (user) => {
//   return jwt.sign(
//     { userId: user.user_id }, // ✅ use user_id
//     process.env.JWT_SECRET,
//     { expiresIn: "5m" } // short life
//   );
// };

// const generateRefreshToken = (user) => {
//   return jwt.sign(
//     { userId: user.user_id }, // ✅ use user_id
//     process.env.REFRESH_SECRET,
//     { expiresIn: "7d" } // long life
//   );
// };

// // --- Login ---
// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   console.log("🔹 Login request:", email, password);

//   try {
//     const user = await prisma.users.findUnique({ where: { email } });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const accessToken = generateAccessToken(user);
//     const refreshToken = generateRefreshToken(user);

//     // Save refreshToken in DB for revocation control
//     await prisma.users.update({
//       where: { user_id: user.user_id }, // ✅ correct key
//       data: { refreshToken },
//     });

//     res.json({
//       accessToken,
//       refreshToken,
//       userId: user.user_id,
//       email: user.email,
//     });
//   } catch (err) {
//     console.error("❌ Login error:", err.message);
//     res.status(500).json({ message: "Server error during login" });
//   }
// };

// // --- Refresh ---
// exports.refreshToken = async (req, res) => {
//   const { refreshToken } = req.body;
//   console.log("🔹 Incoming refresh token request:", refreshToken);

//   if (!refreshToken) {
//     console.log("❌ No refresh token provided from frontend");
//     return res.status(401).json({ message: "No refresh token" });
//   }

//   try {
//     // Verify refresh token
//     const payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
//     console.log("✅ Refresh token decoded payload:", payload);

//     // Find user by decoded ID
//     const user = await prisma.users.findUnique({ where: { user_id: payload.userId } });
//     if (!user) {
//       console.log("❌ User not found for refresh token");
//       return res.status(403).json({ message: "Invalid refresh token - user not found" });
//     }

//     console.log("🔎 User found:", user.user_id, " | Stored refreshToken:", user.refreshToken);

//     // Ensure DB refresh token matches the provided one
//     if (user.refreshToken !== refreshToken) {
//       console.log("❌ Provided refresh token does not match DB stored token");
//       return res.status(403).json({ message: "Invalid refresh token - mismatch" });
//     }

//     // Issue new access token
//     const newAccessToken = generateAccessToken(user);
//     console.log("🎉 New access token generated for user:", user.user_id);

//     res.json({
//       accessToken: newAccessToken,
//       refreshToken, // reuse until expiry
//     });
//   } catch (err) {
//     console.error("❌ Refresh error:", err.message);
//     return res.status(403).json({ message: "Refresh token expired or invalid" });
//   }
// };