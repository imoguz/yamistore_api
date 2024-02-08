"use strict";

const { Schema, model } = require("mongoose");

const storeSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    slug: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    image_url: {
      type: String,
      trim: true,
    },

    logo_url: {
      type: String,
      trim: true,
    },
  },
  { collection: "stores", timestamps: true }
);

module.exports = model("Store", storeSchema);
