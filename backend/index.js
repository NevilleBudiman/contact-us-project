const express = require("express");
var cors = require("cors");
const sequelize = require("./config/sequelize");
const contactUsRoutes = require("./routes/contactUsRoutes");
require("dotenv").config();

var corsOptions = {
  origin: "*",
  credentials: true,
};

const app = express();

app.use(express.json());
app.use(cors(corsOptions));

contactUsRoutes(app);

const PORT = 3001;

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
