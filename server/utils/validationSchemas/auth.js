const yup = require("yup");

const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(4).required(),
});

const signupSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  age: yup.number().required(),
  password: yup.string().min(4).required(),
});

const updateProfileSchema = yup.object({
  name: yup.string().required(),
  age: yup.number().required(),
});

const schema = {
  login: loginSchema,
  signup: signupSchema,
  profile: updateProfileSchema,
};

module.exports = schema;
