// const express = require("express");
// const router = express.Router();
// const errors = require("http-errors");
// const validation = require("../utils/middlewares/validation");
// const schema = require("../utils/validationSchemas/auth");

// router.get("/article", (req, res) => {
//   res.send("Listening for get user");
// });

// // Signup api
// router.post("/article", validation(schema.signup), (req, res) => {
//   console.log(req.body);
//   res.status(201).send("User Added Successfully");
// });

// // Login api
// router.post("/login", validation(schema.login), (req, res) => {});

// // Update profile api
// router.put("/users/:userId", validation(schema.profile), (req, res) => {});

// module.exports = router;