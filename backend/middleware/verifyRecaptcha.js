const axios = require("axios");

module.exports = async (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "reCAPTCHA token is required" });
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const url = "https://www.google.com/recaptcha/api/siteverify";

  try {
    const response = await axios.post(url, null, {
      params: {
        secret: secretKey,
        response: token
      },
    });

    if (!response.data.success) {
      return res.status(400).json({ message: "Invalid reCAPTCHA" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Error reCAPTCHA" });
  }
};
