const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const validatePassword = require("../utils/passwordValidator");

// ---------------- SIGNUP ----------------
exports.signup = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!["customer", "technician"].includes(role))
      return res.status(400).json({ message: "Invalid role" });

    if (!validatePassword(password))
      return res.status(400).json({
        message:
          "Password must contain uppercase, lowercase, special character and be longer than 8 characters"
      });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ email, password: hashedPassword, role });

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- LOGIN ----------------
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // 1️⃣ Check if email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Account does not exist" });
    }

    // 2️⃣ Optional: check role if provided
    if (role && user.role !== role) {
      return res.status(401).json({ message: "Invalid role" });
    }

    // 3️⃣ Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // ✅ Success
    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};


// ---------------- FORGOT PASSWORD ----------------
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // 1️⃣ Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      // ❌ Email not found
      return res.status(404).json({ message: "Account does not exist" });
    }

    // 2️⃣ For hackathon: return a fake "reset link sent"
    // You can later integrate real email
    return res.status(200).json({ message: "Password reset link sent to email" });

  } catch (error) {
    console.error(error); // always good for debugging
    return res.status(500).json({ message: "Server error" });
  }
};

