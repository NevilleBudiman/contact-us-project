const contactUsController = require("../controllers/contactUsController");
const ContactUs = require("../models/contactUsModel");

jest.mock("../models/contactUsModel");

describe("Contact Us Controller", () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      body: {
        name: "Neville",
        email: "neville@example.com",
        subject: "Greeting",
        message: "Hello! How are you?",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should submit contact us form successfully", async () => {
    ContactUs.create.mockResolvedValue(req.body);

    await contactUsController.submitForm(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
    });
  });

  it("should handle errors", async () => {
    const error = new Error("Database error");

    ContactUs.create.mockRejectedValue(error);

    await contactUsController.submitForm(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Database error",
    });
  });
});
