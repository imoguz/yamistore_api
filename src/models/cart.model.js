"use strict";

const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
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

    variant_id: {
      type: Schema.Types.ObjectId,
      ref: "Variant",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "completed", "canceled"],
      default: "pending",
    },

    orderDate: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "carts", timestamps: true }
);

module.exports = model("Cart", cartSchema);
