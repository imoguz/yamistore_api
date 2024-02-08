"use strict";

const Discount = require("../models/discount.model");

module.exports = {
  create: async (req, res) => {
    /*
      #swagger.tags = ["Discounts"]
      #swagger.summary = "Create Discount"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "type": "enum:[monetary, percentage]",
          "amount": "String",
          "start_date": "String",
          "end_date": "String",
          }
        }
    */

    const data = await Discount.create(req.body);
    res.status(201).send(data);
  },

  readOne: async (req, res) => {
    /*
      #swagger.tags = ["Discounts"]
      #swagger.summary = "Get Single Discount"
    */

    const data = await Discount.findOne({ _id: req.params.id });
    res.status(200).send(data);
  },

  readMany: async (req, res) => {
    /*
      #swagger.tags = ["Discounts"]
      #swagger.summary = "List Discounts"
      #swagger.description = `
        You can send query with endpoint for search[], sort[], page and limit.
        <ul> Examples:
          <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
          <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
          <li>URL/?<b>page=2&limit=1</b></li>
        </ul>`
    */

    const data = await req.queryHandler(Discount);
    res.status(200).send(data);
  },

  update: async (req, res) => {
    /*
      #swagger.tags = ["Discounts"]
      #swagger.summary = "Update Discount"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "type": "enum:[monetary, percentage]",
          "amount": "String",
          "start_date": "String",
          "end_date": "String",
          }
        }
    */

    const data = await Discount.findByIdAndUpdate(
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
      #swagger.tags = ["Discounts"]
      #swagger.summary = "Delete Discount"
    */

    const data = await Discount.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount ? 204 : 404).send(data);
  },
};
