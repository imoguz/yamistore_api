"use strict";

const Product = require("../models/product.model");

module.exports = {
  create: async (req, res) => {
    /*
      #swagger.tags = ["Products"]
      #swagger.summary = "Create Product"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "name": "String",
          "description": "String",
          "brand": "ObjectId",
          "category": "object",
          "store": "ObjectId",
          "price": "Number",
          "discount": "ObjectId",
          "promotion": "ObjectId",
          "images": "String[]",
          }
        }
    */

    const data = await Product.create(req.body);
    res.status(201).send(data);
  },

  readOne: async (req, res) => {
    /*
      #swagger.tags = ["Products"]
      #swagger.summary = "Get Single Product"
    */

    const data = await Product.findOne({ _id: req.params.id }).populate([
      "brand",
      "discount",
      "store",
      "promotion",
      {
        path: "category",
        populate: { path: "parentCategory", populate: "parentCategory" },
      },
      { path: "variants", populate: ["size_id", "color_id"] },
      { path: "reviews", populate: ["user_id"] },
    ]);
    res.status(200).send(data);
  },

  readMany: async (req, res) => {
    /*
      #swagger.tags = ["Products"]
      #swagger.summary = "List Products"
      #swagger.description = `
        You can send query with endpoint for search[], sort[], page and limit. For category search, subcategory, category,topcategory
        <ul> Examples:
          <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
          <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
          <li>URL/?<b>page=2&limit=1</b></li>
          <li>URL/?<b>subcategory=dresses&midcategory=clothing&topcategory=women</b></li>
        </ul>`
    */

    const data = await req.queryHandlerProduct(Product, [
      "brand",
      "discount",
      "store",
      "promotion",
      {
        path: "category",
        populate: { path: "parentCategory", populate: "parentCategory" },
      },
      { path: "variants", populate: ["size_id", "color_id"] },
      { path: "reviews", populate: ["user_id"] },
    ]);

    res.status(200).send(data);
  },

  update: async (req, res) => {
    /*
      #swagger.tags = ["Products"]
      #swagger.summary = "Update Product"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "name": "String",
          "description": "String",
          "brand": "ObjectId",
          "category": "object",
          "store": "ObjectId",
          "price": "Number",
          "discount": "ObjectId",
          "promotion": "ObjectId",
          "images": "String[]",
          }
        }
    */

    const data = await Product.findOneAndUpdate(
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
      #swagger.tags = ["Products"]
      #swagger.summary = "Delete Product"
    */

    const data = await Product.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount ? 204 : 404).send(data);
  },
};
