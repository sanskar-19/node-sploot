const express = require("express");
const router = express.Router();
const createErrors = require("http-errors");
const validation = require("../utils/middlewares/validation");
const schema = require("../utils/validationSchemas/auth");

// Model
const User = require("../models/user.model");

// JWT utils
const { signAccessToken } = require("../utils/jwt/index");
const jwt = require("../utils/jwt/index");

router.get("/user", (req, res) => {
  res.send("Listening for get user");
});

// Signup api
router.post("/signup", validation(schema.signup), async (req, res, next) => {
  try {
    const { email, password, age, name } = req.body;
    const doesExist = await User.findOne({ email: email });
    if (doesExist)
      res.status(409).send({
        statusCode: 409,
        data: {},
        message: null,
        error: "Email Already Exists",
      });

    const user = new User({ email, password, age, name });
    const savedUser = await user.save();
    console.log(req.body);

    const accessToken = await signAccessToken(savedUser.id);
    res.send({
      statusCode: 201,
      data: { token: accessToken },
      message: "User Created Successfully",
      error: null,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/login", validation(schema.login), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      res.status(404).send({
        statusCode: 404,
        data: {},
        message: null,
        error: "User Not found",
      });

    let isMatched = await user.verifyPassword(password, user.password);
    if (isMatched) {
      res.status(200).send({
        statusCode: 200,
        data: { token: await signAccessToken(user.id) },
        message: "Logged in successfully",
        error: null,
      });
    } else {
      res.status(401).send({
        statusCode: 401,
        data: {},
        message: null,
        error: "Invalid Credentials",
      });
    }
  } catch (error) {
    next(error);
  }
});

// Update profile api
router.put("/users/:userId", validation(schema.profile), (req, res) => {});

module.exports = router;
