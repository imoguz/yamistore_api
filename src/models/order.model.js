"use strict";

const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
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

    quantity: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    total_price: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "processing", "delivered", "canselled"],
      required: true,
    },
  },
  { collection: "orders", timestamps: true }
);

module.exports = model("Order", orderSchema);
