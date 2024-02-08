"use strict";

const { Schema, model } = require("mongoose");

const variantSchema = new Schema(
  {
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    size_id: {
      type: Schema.Types.ObjectId,
      ref: "Size",
      required: true,
    },

    color_id: {
      type: Schema.Types.ObjectId,
      ref: "Color",
      required: true,
    },

    image_url: {
      type: String,
      trim: true,
      required: true,
    },

    stock: {
      type: Number,
      required: true,
    },

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "variants", timestamps: true }
);

module.exports = model("Variant", variantSchema);
