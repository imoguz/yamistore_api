"use strict";

const { Schema, model } = require("mongoose");

const discountSchema = new Schema(
  {
    type: {
      type: String,
      trim: true,
      enum: ["monetary", "percentage"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    start_date: {
      type: Date,
      required: true,
    },

    end_date: {
      type: Date,
      required: true,
    },
  },
  { collection: "discounts", timestamps: true }
);

module.exports = model("Discount", discountSchema);
