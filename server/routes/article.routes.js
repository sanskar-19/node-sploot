const express = require("express");
const router = express.Router();
const errors = require("http-errors");

// Validation
const validation = require("../utils/middlewares/validation");
const schema = require("../utils/validationSchemas/article");

// Model
const Article = require("../models/article.model");

// Routes
router.get("/articles", (req, res) => {
  res.send("Listening for get articles");
});

// Create new article api
router.post(
  "/users/:userId/article",
  validation(schema.newArticle),
  (req, res, next) => {
    console.log(req.params.userId);
    console.log(req.body);
    res.status(201).send("User Added Successfully");
  }
);

module.exports = router;
