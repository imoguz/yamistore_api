"use strict";

const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },

    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { collection: "categories", timestamps: true }
);

module.exports = model("Category", categorySchema);
