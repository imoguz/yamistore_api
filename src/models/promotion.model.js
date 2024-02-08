"use strict";

const { Schema, model } = require("mongoose");

const promotionSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      trim: true,
    },

    type: {
      type: String,
      enum: ["monetary", "percentage"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    min_purchase: {
      type: Number,
      required: true,
    },

    expired_date: {
      type: Date,
      required: true,
    },
  },
  { collection: "promotions", timestamps: true }
);

module.exports = model("Promotion", promotionSchema);
