"use strict";

const { Schema, model } = require("mongoose");

const colorSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },

    hex_code: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { collection: "colors", timestamps: true }
);

module.exports = model("Color", colorSchema);
