"use strict";

const { Schema, model } = require("mongoose");

const bannerSchema = new Schema(
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

    link: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { collection: "banners", timestamps: true }
);

module.exports = model("Banner", bannerSchema);
