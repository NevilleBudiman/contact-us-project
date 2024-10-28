const ContactUs = require("../models/contactUsModel");

module.exports = {
  submitForm: async (req, res) => {
    const { name, email, subject, message } = req.body;

    try {
      const newContact = await ContactUs.create({
        name,
        email,
        subject,
        message,
      });
      
      res.status(201).json({ success: true });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
