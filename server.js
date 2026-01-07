"use strict";

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
require("./routes/api")(app);

// Root
app.get("/", (req, res) => {
  res.send("URL Shortener Microservice");
});

// Listen
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app; // REQUIRED for FCC tests
