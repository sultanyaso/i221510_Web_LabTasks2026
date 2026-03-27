const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const app = express();
app.use(express.json());

/* ======================
   DATABASE CONNECTION
====================== */
mongoose.connect("mongodb://127.0.0.1:27017/fitnessApp")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error:", err));

/* ======================
   USER SCHEMA
====================== */
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: String,
  resetToken: String,
  resetTokenExpiry: Date
});

const User = mongoose.model("User", userSchema);

/* ======================
   MIDDLEWARE
====================== */

// VERIFY JWT
const authMiddleware = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, "secretkey");

    req.user = decoded; // contains id, username, role
    next();

  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ADMIN ONLY
const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.json({ message: "Access forbidden: Admins only" });
  }
  next();
};

/* ======================
   REGISTER
====================== */
app.post("/api/auth/register", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      password: hashedPassword,
      role
    });

    res.json({ message: "User registered successfully" });

  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
});

/* ======================
   LOGIN
====================== */
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 🔥 INCLUDE ROLE HERE
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role
      },
      "secretkey",
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });

  } catch (err) {
    res.status(500).json({ message: "Login error" });
  }
});

/* ======================
   FORGOT PASSWORD
====================== */
app.post("/api/auth/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.json({ message: "User not found" });

    const token = crypto.randomBytes(20).toString("hex");

    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000;

    await user.save();

    res.json({
      message: "Reset token generated",
      token
    });

  } catch (err) {
    res.status(500).json({ message: "Error generating token" });
  }
});

/* ======================
   RESET PASSWORD
====================== */
app.post("/api/auth/reset-password/:token", async (req, res) => {
  try {
    const user = await User.findOne({
      resetToken: req.params.token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.json({ message: "Invalid or expired token" });
    }

    user.password = await bcrypt.hash(req.body.newPassword, 10);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });

  } catch (err) {
    res.status(500).json({ message: "Error resetting password" });
  }
});

/* ======================
   ADMIN ROUTE (PROTECTED)
====================== */
app.get("/api/content/admin", authMiddleware, adminOnly, (req, res) => {
  res.json({ message: "Welcome to the content management panel!" });
});

/* ======================
   SERVER
====================== */
app.listen(5000, () => {
  console.log("Server running on port 5000");
});