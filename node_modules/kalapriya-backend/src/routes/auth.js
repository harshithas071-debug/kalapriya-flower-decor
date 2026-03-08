const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { protect } = require("../middleware/auth");

const router = express.Router();

// In production, store hashed password in DB or env
// For now, compare against env credentials directly
const generateToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Username and password are required." });
    }

    const validUsername = process.env.ADMIN_USERNAME || "kalapriya_admin";
    const validPassword = process.env.ADMIN_PASSWORD || "floral@2024";

    if (username !== validUsername || password !== validPassword) {
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }

    const token = generateToken({ username, role: "admin" });

    res.json({
      success: true,
      message: "Login successful",
      token,
      admin: { username, role: "admin" },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/auth/verify  — check if token is still valid
router.get("/verify", protect, (req, res) => {
  res.json({ success: true, admin: req.admin });
});

// POST /api/auth/logout  — client just discards token; this is informational
router.post("/logout", protect, (req, res) => {
  res.json({ success: true, message: "Logged out successfully." });
});

module.exports = router;
