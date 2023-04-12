const express = require("express");
const router = express.Router();
const createErrors = require("http-errors");
const validation = require("../utils/middlewares/validation");
const schema = require("../utils/validationSchemas/auth");
const User = require("../models/user.model");
router.get("/user", (req, res) => {
  res.send("Listening for get user");
});

// Signup api
router.post("/signup", validation(schema.signup), async (req, res, next) => {
  try {
    const { email, password, age, name } = req.body;
    const doesExist = await User.findOne({ email: email });
    if (doesExist) throw createErrors.Conflict(`${email} already exists`);

    const user = new User({ email, password, age, name });
    const savedUser = await user.save();

    res.send(savedUser);
  } catch (error) {
    next(error);
  }
});

// Login api
router.post("/login", validation(schema.login), (req, res) => {});

// Update profile api
router.put("/users/:userId", validation(schema.profile), (req, res) => {});

module.exports = router;
