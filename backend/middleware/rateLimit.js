const rateLimit = require("express-rate-limit");

module.exports = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 3,
  handler: (req, res) => {
    return res.status(429).json({
      message: "Too many requests, please try again later"
    });
  }
});
