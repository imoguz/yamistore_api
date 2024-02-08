"use strict";

const Wishlist = require("../models/wishlist.model");

module.exports = {
  create: async (req, res) => {
    /*
      #swagger.tags = ["Wishlists"]
      #swagger.summary = "Create Wishlist"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "user_id": "ObjectId",
          "product_id": "ObjectId",
          }
        }
    */
    const isWish = await Wishlist.findOne({
      user_id: req.body.user_id,
      product_id: req.body.product_id,
    });
    const data = isWish
      ? await Wishlist.deleteOne({
          user_id: req.body.user_id,
          product_id: req.body.product_id,
        })
      : await Wishlist.create(req.body);

    res.status(data?.deletedCount ? 204 : 201).send(data);
  },

  readOne: async (req, res) => {
    /*
      #swagger.tags = ["Wishlists"]
      #swagger.summary = "Get Single Wishlist"
    */

    const data = await Wishlist.findOne({ _id: req.params.id }).populate([
      "user_id",
      {
        path: "product_id",
        populate: { path: "variants", populate: ["color_id", "size_id"] },
      },
      { path: "product_id", populate: { path: "discount" } },
    ]);
    res.status(200).send(data);
  },

  readMany: async (req, res) => {
    /*
      #swagger.tags = ["Wishlists"]
      #swagger.summary = "List Wishlists"
      #swagger.description = `
        You can send query with endpoint for search[], sort[], page and limit.
        <ul> Examples:
        <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
        <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
        <li>URL/?<b>page=2&limit=1</b></li>
        </ul>`
        */
    const userId = req.query.userId;

    const data = await req.queryHandler(
      Wishlist,
      [
        "user_id",
        {
          path: "product_id",
          populate: { path: "variants", populate: ["color_id", "size_id"] },
        },
        { path: "product_id", populate: { path: "discount" } },
      ],
      { user_id: userId }
    );
    res.status(200).send(data);
  },

  update: async (req, res) => {
    /*
      #swagger.tags = ["Wishlists"]
      #swagger.summary = "Update Wishlist"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "user_id": "ObjectId",
          "product_id": "ObjectId",
          }
        }
    */

    const data = await Wishlist.findByIdAndUpdate(
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
      #swagger.tags = ["Wishlists"]
      #swagger.summary = "Delete Wishlist"
    */

    const data = await Wishlist.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount ? 204 : 404).send(data);
  },
};
