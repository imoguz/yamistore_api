"use strict";

const Promotion = require("../models/promotion.model");

module.exports = {
  create: async (req, res) => {
    /*
      #swagger.tags = ["Promotions"]
      #swagger.summary = "Create Promotion"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "code": "String",
          "description": "String",
          "type": "enum:[monetary, percentage]",
          "amount": "Number",
          "min_purchase": "Number",
          "expired_date": "Date",
          }
        }
    */

    const data = await Promotion.create(req.body);
    res.status(201).send(data);
  },

  readOne: async (req, res) => {
    /*
      #swagger.tags = ["Promotions"]
      #swagger.summary = "Get Single Promotion"
    */

    const data = await Promotion.findOne({ _id: req.params.id });
    res.status(200).send(data);
  },

  readMany: async (req, res) => {
    /*
      #swagger.tags = ["Promotions"]
      #swagger.summary = "List Promotions"
      #swagger.description = `
        You can send query with endpoint for search[], sort[], page and limit.
        <ul> Examples:
          <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
          <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
          <li>URL/?<b>page=2&limit=1</b></li>
        </ul>`
    */

    const data = await req.queryHandler(Promotion);
    res.status(200).send(data);
  },

  update: async (req, res) => {
    /*
      #swagger.tags = ["Promotions"]
      #swagger.summary = "Update Promotion"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "code": "String",
          "description": "String",
          "type": "enum:[monetary, percentage]",
          "amount": "Number",
          "min_purchase": "Number",
          "expired_date": "Date",
          }
        }
    */

    const data = await Promotion.findByIdAndUpdate(
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
      #swagger.tags = ["Promotions"]
      #swagger.summary = "Delete Promotion"
    */

    const data = await Promotion.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount ? 204 : 404).send(data);
  },
};
