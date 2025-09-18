const bcrypt = require("bcrypt");
const user = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  const { name, email, password, role } = req.body;
  user.register(name, email, password, role, (err, result) => {
    if (err) return res.status(500).send("Error creating user");
    res.status(201).send("User created successfully");
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  user.login(email, async (err, result) => {
    if (err) return res.status(500).send("Database error");

    const dbUser = result[0];
    if (!dbUser) return res.status(404).send("User not found");

    const match = await bcrypt.compare(password, dbUser.password);
    if (!match) return res.status(401).send("Invalid credentials");

    res.status(200).json({
      success: true,
      role: dbUser.role
    });
  });
};
