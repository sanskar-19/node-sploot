const yup = require("yup");
const ArticleSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
});

const schema = {
  newArticle: ArticleSchema,
};

module.exports = schema;
