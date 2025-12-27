const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const validatePassword = require("../utils/passwordValidator");

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate password
    if (!validatePassword(password)) {
      return res.status(400).json({
        message:
          "Password must contain uppercase, lowercase, special character and be longer than 8 characters"
      });
    }

    // Check email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    await User.create({
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
