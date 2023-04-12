const express = require("express");
const router = express.Router();
const createErrors = require("http-errors");

// Validation
const validation = require("../utils/middlewares/validation");
const schema = require("../utils/validationSchemas/article");

// Model
const Article = require("../models/article.model");
const { verifyAccessToken } = require("../utils/jwt/index");
const User = require("../models/user.model");
// Routes
router.get("/articles", (req, res) => {
  res.send("Listening for get articles");
});

// Create new article api
router.post(
  "/users/:userId/article",
  verifyAccessToken,
  validation(schema.newArticle),
  async (req, res, next) => {
    console.log(req);
    try {
      const { title, description } = req.body;
      if (!req.params.userId.match(/^[0-9a-fA-F]{24}$/)) {
        throw createErrors.BadRequest("Invalid User Id");
      }
      const user = await User.findById(req.params.userId);
      if (!user) throw createErrors.NotFound("User not found");
      else {
        const article = new Article({
          title,
          description,
          author: user.id,
        });
        const savedArticle = await article.save();
        res.status(201).send({
          statusCode: 201,
          data: { article: savedArticle },
          message: "Article Created Successfully",
          error: null,
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
