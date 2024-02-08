"use strict";

const Cart = require("../models/cart.model");

module.exports = {
  create: async (req, res) => {
    /*
      #swagger.tags = ["Carts"]
      #swagger.summary = "Create Cart"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "user_id": "ObjectId",
          "product_id": "ObjectId",
          "variant_id": "ObjectId",
          "quantity": "Number",
          "status": "enum:[pending, completed, canceled]",
          "orderDate": "Date",
          }
        }
    */

    // if cart already added just add quantity to old record
    const isProduct = await Cart.findOne({
      user_id: req.body.user_id,
      variant_id: req.body.variant_id,
    });
    if (isProduct) {
      req.body.quantity = req.body.quantity + isProduct.quantity;
      const data = await Cart.findByIdAndUpdate(
        { _id: isProduct._id },
        req.body,
        {
          runValidators: true,
          new: true,
        }
      );
      res.status(202).send(data);
    } else {
      const data = await Cart.create(req.body);
      res.status(201).send(data);
    }
  },

  readOne: async (req, res) => {
    /*
      #swagger.tags = ["Carts"]
      #swagger.summary = "Get Single Cart"
    */

    const data = await Cart.findOne({ _id: req.params.id }).populate([
      "user_id",
      { path: "variant_id", populate: ["size_id", "color_id"] },
      { path: "product_id", populate: "discount" },
    ]);
    res.status(200).send(data);
  },

  readMany: async (req, res) => {
    /*
      #swagger.tags = ["Carts"]
      #swagger.summary = "List Carts"
      #swagger.description = `
        You can send query with endpoint for search[], sort[], page and limit.
        <ul> Examples:
          <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
          <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
          <li>URL/?<b>page=2&limit=1</b></li>
        </ul>`
    */
    const userId = req.query.userId;
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const data = await req.queryHandler(
      Cart,
      [
        "user_id",
        { path: "variant_id", populate: ["size_id", "color_id"] },
        { path: "product_id", populate: "discount" },
      ],
      { user_id: userId, createdAt: { $gte: oneWeekAgo } }
    );
    res.status(200).send(data);
  },

  update: async (req, res) => {
    /*
      #swagger.tags = ["Carts"]
      #swagger.summary = "Update Cart"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "user_id": "ObjectId",
          "product_id": "ObjectId",
          "variant_id": "ObjectId",
          "quantity": "Number",
          "status": "enum:[pending, completed, canceled]",
          "orderDate": "Date",
          }
        }
    */

    const data = await Cart.findByIdAndUpdate(
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
      #swagger.tags = ["Carts"]
      #swagger.summary = "Delete Cart"
    */

    const data = await Cart.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount ? 204 : 404).send(data);
  },
};
