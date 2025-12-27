const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const validatePassword = require("../utils/passwordValidator");


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


exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Account does not exist" });
    }

    
    if (role && user.role !== role) {
      return res.status(401).json({ message: "Invalid role" });
    }

   
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid password" });
    }

    
    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};



exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    
    const user = await User.findOne({ email });

    if (!user) {
      
      return res.status(404).json({ message: "Account does not exist" });
    }

    
    return res.status(200).json({ message: "Password reset link sent to email" });

  } catch (error) {
    console.error(error); 
    return res.status(500).json({ message: "Server error" });
  }
};

