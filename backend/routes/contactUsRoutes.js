const verifyRecaptcha = require("../middleware/verifyRecaptcha");
const rateLimit = require("../middleware/rateLimit");
const contactUsController = require("../controllers/contactUsController");
const { body, validationResult } = require("express-validator");

module.exports = (app) => {
  app.post(
    "/backend/save-form",
    verifyRecaptcha,
    rateLimit,
    body("name").notEmpty(),
    body("email").isEmail(),
    body("subject").notEmpty(),
    body("message").notEmpty(),
    body("token").notEmpty(),
    (req, res, next) => {
      const errors = validationResult(req).array({ onlyFirstError: true });
      if (errors.length > 0)
        return res.status(500).json({ message: "Invalid Data" });
      next();
    },
    (req, res) => {
      contactUsController.submitForm(req, res);
    }
  );
};
