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

// Fetch all articles
router.get("/articles", verifyAccessToken, async (req, res, next) => {
  try {
    let articleList = await Article.find();

    // Creating article items array
    let data = new Array();
    for (let i = 0; i < articleList.length; i++) {
      let info = await fetchAuthorDetails(articleList[i].author);
      let article = { article: articleList[i], author: info };
      data.push(article);
    }
    res.status(200).send({
      statusCode: 200,
      data: { articles: data },
      message: "Fetched all articles",
      error: null,
    });
  } catch (error) {
    next(error);
  }
});

// Function to fetch user info
async function fetchAuthorDetails(AuthorId) {
  const user = await User.findById(AuthorId);
  return { name: user.name, email: user.email, age: user.age };
}

// Create new article api
router.post(
  "/users/:userId/articles",
  verifyAccessToken,
  validation(schema.newArticle),
  async (req, res, next) => {
    // console.log(req);
    try {
      if (req.payload.userId != req.params.userId)
        throw createErrors.NotFound("User not found");

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
