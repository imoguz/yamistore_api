"use strict";

const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    product_id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    rating: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5],
    },

    comment: {
      type: String,
      trim: true,
    },
  },
  { collection: "reviews", timestamps: true }
);

module.exports = model("Review", reviewSchema);
