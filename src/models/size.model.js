"use strict";

const { Schema, model } = require("mongoose");

const sizeSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { collection: "sizes", timestamps: true }
);

module.exports = model("Size", sizeSchema);
