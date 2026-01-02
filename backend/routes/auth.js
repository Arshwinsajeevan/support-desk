const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


// 🟢 SEED DEFAULT ADMIN (Run once)
router.get("/seed-admin", async (req, res) => {

  const exists = await User.findOne({ email: "admin@test.com" });

  if (exists) return res.json({ msg: "Admin already exists" });

  const hashed = await bcrypt.hash("admin123", 10);

  await User.create({
    name: "Admin",
    email: "admin@test.com",
    password: hashed,
    role: "admin"
  });

  res.json({ msg: "Admin created" });
});


// 🟢 LOGIN
router.post("/login", async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ msg: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);

  if (!match) return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    token,
    role: user.role,
    email: user.email
  });
});


module.exports = router;
