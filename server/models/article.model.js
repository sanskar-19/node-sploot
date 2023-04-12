const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
});

const Article = mongoose.model("article", ArticleSchema);
module.exports = Article;
