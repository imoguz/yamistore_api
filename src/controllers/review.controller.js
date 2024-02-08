"use strict";

const Review = require("../models/review.model");
const Product = require("../models/product.model");

module.exports = {
  create: async (req, res) => {
    /*
      #swagger.tags = ["Reviews"]
      #swagger.summary = "Create Review"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "user_id": "ObjectId",
          "product_id": "ObjectId",
          "rating": "String",
          "comment": "String",
          }
        }
    */

    const data = await Review.create(req.body);
    const product = await Product.findById(data.product_id);
    if (product) {
      product.reviews.push(data._id);
      await product.save();
    }
    res.status(201).send(data);
  },

  readOne: async (req, res) => {
    /*
      #swagger.tags = ["Reviews"]
      #swagger.summary = "Get Single Review"
    */

    const data = await Review.findOne({ _id: req.params.id });
    res.status(200).send(data);
  },

  readMany: async (req, res) => {
    /*
      #swagger.tags = ["Reviews"]
      #swagger.summary = "List Reviews"
      #swagger.description = `
        You can send query with endpoint for search[], sort[], page and limit.
        <ul> Examples:
          <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
          <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
          <li>URL/?<b>page=2&limit=1</b></li>
        </ul>`
    */

    const data = await req.queryHandler(Review);
    res.status(200).send(data);
  },

  update: async (req, res) => {
    /*
      #swagger.tags = ["Reviews"]
      #swagger.summary = "Update Review"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "user_id": "ObjectId",
          "product_id": "ObjectId",
          "rating": "String",
          "comment": "String",
          }
        }
    */

    const data = await Review.findByIdAndUpdate(
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
      #swagger.tags = ["Reviews"]
      #swagger.summary = "Delete Review"
    */

    const data = await Review.deleteOne({ _id: req.params.id });
    // delete the review in Product model
    if (data) {
      const product = await Product.findById(data.product_id);
      if (product) {
        product.reviews = product.reviews.filter(
          (reviewId) => !reviewId.equals(data._id)
        );
        await product.save();
      }
    }

    res.status(data.deletedCount ? 204 : 404).send(data);
  },
};
