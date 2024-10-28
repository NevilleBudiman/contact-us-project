const ContactUs = require("../models/contactUsModel");

const sequelize = require("../config/sequelize");

describe("Contact Us Model", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a contact us entry", async () => {
    const contactData = {
      name: "Neville",
      email: "neville@example.com",
      subject: "Greeting",
      message: "Hello! How are you?",
    };
    const contact = await ContactUs.create(contactData);

    expect(contact).toHaveProperty("id");
    expect(contact.name).toBe(contactData.name);
    expect(contact.email).toBe(contactData.email);
    expect(contact.subject).toBe(contactData.subject);
    expect(contact.message).toBe(contactData.message);
  });

  it("should fail to create contact us entry without a valid email", async () => {
    const contactData = {
      name: "Neville",
      email: "neville.example.com",
      subject: "Greeting",
      message: "Hello! How are you?",
    };

    await expect(ContactUs.create(contactData)).rejects.toThrow();
  });

  it("should fail to create contact us entry without required fields", async () => {
    const contactData = {
      name: "Neville",
    };

    await expect(ContactUs.create(contactData)).rejects.toThrow();
  });
});
