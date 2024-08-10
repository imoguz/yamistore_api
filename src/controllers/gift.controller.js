"use strict";

const Gift = require("../models/gift.model");

module.exports = {
  create: async (req, res) => {
    /*
      #swagger.tags = ["Gifts"]
      #swagger.summary = "Create Gift"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "label": "String",
          "description": "String",
          "image_url": "String",
          "link": "String",
          }
        }
    */

    const data = await Gift.create(req.body);
    res.status(201).send(data);
  },

  readOne: async (req, res) => {
    /*
      #swagger.tags = ["Gifts"]
      #swagger.summary = "Get Single Gift"
    */

    const data = await Gift.findOne({ _id: req.params.id });
    res.status(200).send(data);
  },

  readMany: async (req, res) => {
    /*
      #swagger.tags = ["Gifts"]
      #swagger.summary = "List Gifts"
      #swagger.description = `
        You can send query with endpoint for search[], sort[], page and limit.
        <ul> Examples:
          <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
          <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
          <li>URL/?<b>page=2&limit=1</b></li>
        </ul>`
    */

    const data = await req.queryHandler(Gift);
    res.status(200).send(data);
  },

  update: async (req, res) => {
    /*
      #swagger.tags = ["Gifts"]
      #swagger.summary = "Update Gift"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "label": "String",
          "description": "String",
          "image_url": "String",
          "link": "String",
          }
        }
    */

    const data = await Gift.findByIdAndUpdate(
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
      #swagger.tags = ["Gifts"]
      #swagger.summary = "Delete Gift"
    */

    const data = await Gift.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount ? 204 : 404).send(data);
  },
};
