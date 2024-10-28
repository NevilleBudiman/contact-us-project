const verifyRecaptcha = require("../middleware/verifyRecaptcha");
const axios = require("axios");

jest.mock("axios");

describe("verifyRecaptcha Middleware", () => {
  it("should call next() if reCAPTCHA is valid", async () => {
    const req = { body: { token: "123245" } };
    const res = {};
    const next = jest.fn();

    axios.post.mockResolvedValue({ data: { success: true } });

    await verifyRecaptcha(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("should return 400 if reCAPTCHA token is missing", async () => {
    const req = { body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await verifyRecaptcha(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "reCAPTCHA token is required",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 400 if reCAPTCHA is invalid", async () => {
    const req = { body: { token: "12345" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    axios.post.mockResolvedValue({ data: { success: false } });

    await verifyRecaptcha(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid reCAPTCHA",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 500 if there is an error during verification", async () => {
    const req = { body: { token: "123455" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    axios.post.mockRejectedValue(new Error("Network Error"));

    await verifyRecaptcha(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Error reCAPTCHA" });
    expect(next).not.toHaveBeenCalled();
  });
});
