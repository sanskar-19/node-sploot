const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

// Encrypting the password using bcrypt before storing
UserSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    console.log(this.email, this.password);
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
