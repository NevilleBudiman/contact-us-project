const request = require("supertest");
const express = require("express");
const contactUsRoutes = require("../routes/contactUsRoutes");

const app = express();
app.use(express.json());

contactUsRoutes(app);

jest.mock("../controllers/contactUsController", () => ({
  submitForm: jest.fn((req, res) => {
    res.status(201).json({ success: true });
  }),
}));

jest.mock("../middleware/verifyRecaptcha", () => {
  return jest.fn((req, res, next) => {
    next();
  });
});

jest.mock("../middleware/rateLimit", () => {
  return jest.fn((req, res, next) => {
    next();
  });
});

const verifyRecaptcha = require("../middleware/verifyRecaptcha");
const rateLimit = require("../middleware/rateLimit");

describe("Contact Us Route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully submit contact us form with reCaptcha verification and rate limiting", async () => {
    const response = await request(app).post("/backend/save-form").send({
      name: "Neville",
      email: "neville@example.com",
      subject: "Greeting",
      message: "Hello! How are you?",
      token: "124141",
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      success: true,
    });
  });

  it("should fail if the required body is empty or missing", async () => {
    const response = await request(app).post("/backend/save-form").send({
      name: "Neville",
      email: "neville@example.com",
      subject: "Greeting",
      message: "Hello! How are you?",
    });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: "Invalid Data",
    });
  });

  it("should fail if reCaptcha verification failed", async () => {
    verifyRecaptcha.mockImplementation((req, res, next) => {
      return res.status(400).json({ message: "Invalid reCAPTCHA" });
    });

    const response = await request(app).post("/backend/save-form").send({
      name: "Neville",
      email: "neville@example.com",
      subject: "Greeting",
      message: "Hello! How are you?",
      token: "1234",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Invalid reCAPTCHA" });
  });

  it("should fail if rate limit is exceeded", async () => {
    verifyRecaptcha.mockImplementation((req, res, next) => {
      next();
    });

    rateLimit.mockImplementation((req, res, next) => {
      return res.status(429).json({ message: "Too many requests, please try again later" });
    });

    const response = await request(app).post("/backend/save-form").send({
      name: "Neville",
      email: "neville@example.com",
      subject: "Greeting",
      message: "Hello! How are you?",
      token: "1234",
    });

    expect(response.status).toBe(429);
    expect(response.body).toEqual({ message: "Too many requests, please try again later" });
  });
});
