"use strict";

const { Schema, model } = require("mongoose");

const brandSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    description: {
      type: String,
      trim: true,
    },

    logo_url: {
      type: String,
      trim: true,
      required: true,
    },

    website_url: {
      type: String,
      trim: true,
    },
  },
  { collection: "brands", timestamps: true }
);

module.exports = model("Brand", brandSchema);
