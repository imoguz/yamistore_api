"use strict";

const Variant = require("../models/variant.model");
const Product = require("../models/product.model");

module.exports = {
  create: async (req, res) => {
    /*
      #swagger.tags = ["Variants"]
      #swagger.summary = "Create Variant"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "product_id": "ObjectId",
          "size_id": "ObjectId",
          "color_id": "ObjectId",
          "image_url":"String",
          "stock": "Number",
          "isDefault": "Boolean",
          }
        }
    */

    const data = await Variant.create(req.body);
    const product = await Product.findById(data.product_id);
    if (product) {
      product.variants.push(data._id);
      await product.save();
    }
    res.status(201).send(data);
  },

  readOne: async (req, res) => {
    /*
      #swagger.tags = ["Variants"]
      #swagger.summary = "Get Single Variant"
    */

    const data = await Variant.findOne({ _id: req.params.id }).populate([
      "product_id",
      "size_id",
      "color_id",
    ]);
    res.status(200).send(data);
  },

  readMany: async (req, res) => {
    /*
      #swagger.tags = ["Variants"]
      #swagger.summary = "List Variants"
      #swagger.description = `
        You can send query with endpoint for search[], sort[], page and limit.
        <ul> Examples:
          <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
          <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
          <li>URL/?<b>page=2&limit=1</b></li>
        </ul>`
    */

    const data = await req.queryHandler(Variant, [
      "product_id",
      "size_id",
      "color_id",
    ]);
    res.status(200).send(data);
  },

  update: async (req, res) => {
    /*
      #swagger.tags = ["Variants"]
      #swagger.summary = "Update Variant"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "product_id": "ObjectId",
          "size_id": "ObjectId",
          "color_id": "ObjectId",
          "image_url":"String",
          "stock": "Number",
          "isDefault": "Boolean",
          }
        }
    */

    const data = await Variant.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );
    res.status(202).send(data);
  },

  _delete: async (req, res) => {
    /*
      #swagger.tags = ["Variants"]
      #swagger.summary = "Delete Variant"
    */

    const data = await Variant.findByIdAndDelete({ _id: req.params.id });
    // delete the variant in Product model
    if (data) {
      const product = await Product.findById(data.product_id);
      if (product) {
        product.variants = product.variants.filter(
          (variantId) => !variantId.equals(data._id)
        );
        await product.save();
      }
    }
    res.status(data ? 204 : 404).send({ DeletedRecord: data });
  },
};
