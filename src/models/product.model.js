"use strict";

const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },

    slug: {
      type: String,
      unique: true,
    },

    description: {
      type: String,
      trim: true,
      required: true,
    },

    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    store: [
      {
        type: Schema.Types.ObjectId,
        ref: "Store",
        required: true,
      },
    ],

    price: {
      type: Number,
      required: true,
    },

    discount: {
      type: Schema.Types.ObjectId,
      ref: "Discount",
    },
    promotion: {
      type: Schema.Types.ObjectId,
      ref: "Promotion",
    },
    variants: [
      {
        type: Schema.Types.ObjectId,
        ref: "Variant",
      },
    ],
    images: [
      {
        url: { type: String, required: true },
        isMainImage: { type: Boolean, default: false },
      },
    ],
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { collection: "products", timestamps: true }
);

productSchema.index({ name: "text" });

productSchema.pre("save", function (next) {
  this.slug = generateSlug(this.name);
  next();
});

productSchema.pre("findOneAndUpdate", function (next) {
  const data = this.getUpdate();
  if (data.name) {
    data.slug = generateSlug(data.name);
  }
  next();
});

function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

module.exports = model("Product", productSchema);
