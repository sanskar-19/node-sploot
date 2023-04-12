const JWT = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = {
  // Signing the accesstoken and setting expiry
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {
        userId,
      };
      const secret = "your-secret-key";
      const options = {
        expiresIn: "10m",
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) reject(createError.InternalServerError());
        resolve(token);
      });
    });
  },

  //   Verify the token
  verifyAccessToken: (token) => {
    return new Promise((resolve, reject) => {
      // JWT.
    });
  },
};
