"use strict";

const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
    .connect(process.env.MONGODB)
    .then(() => console.log("Connected to database."))
    .catch((err) => console.log("Failed to connect to database."));
};

module.exports = dbConnection;
