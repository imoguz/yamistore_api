"use strict";

const { Schema, model } = require("mongoose");

const wishlistSchema = new Schema(
  {
    user_id: {
      type: String,
      trim: true,
      required: true,
    },

    product_id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { collection: "wishlists", timestamps: true }
);

module.exports = model("Wishlist", wishlistSchema);
