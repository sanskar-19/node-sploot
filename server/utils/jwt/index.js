const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const config = require("../../configs/server.config");

module.exports = {
  // Signing the accesstoken and setting expiry
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {
        userId,
      };
      const secret = config.JWT_SECRET;
      const options = {
        expiresIn: config.JWT_EXPIRY,
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) reject(createError.InternalServerError());
        resolve(token);
      });
    });
  },

  //  middleware for verifying the token
  verifyAccessToken: (req, res, next) => {
    if (!req.headers["authorization"]) {
      throw createError.Unauthorized("Unauthorised user");
    }

    // Destructuring the token
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ");
    const jwt = token[1];

    JWT.verify(jwt, "your-secret-key", (err, payload) => {
      if (err) {
        let message =
          err.name === "JsonWebTokenError" ? "Unauthorised" : err.message;
        throw createError.Unauthorized(message);
      } else {
        req.payload = payload;
      }
    });
    next();
  },
};
