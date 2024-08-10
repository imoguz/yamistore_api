"use strict";

const { Schema, model } = require("mongoose");

const giftSchema = new Schema(
  {
    label: {
      type: String,
      trim: true,
      required: true,
    },

    description: {
      type: String,
      trim: true,
      required: true,
    },

    image_url: {
      type: String,
      trim: true,
      required: true,
    },

    hex_code: {
      type: String,
      trim: true,
      required: true,
    },

    path: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { collection: "gifts", timestamps: true }
);

module.exports = model("Gift", giftSchema);
