"use strict";

const Color = require("../models/color.model");

module.exports = {
  create: async (req, res) => {
    /*
      #swagger.tags = ["Colors"]
      #swagger.summary = "Create Color"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "name": "String",
          "hexCode": String,
          }
        }
    */

    const data = await Color.create(req.body);
    res.status(201).send(data);
  },

  readOne: async (req, res) => {
    /*
      #swagger.tags = ["Colors"]
      #swagger.summary = "Get Single Color"
    */

    const data = await Color.findOne({ _id: req.params.id });
    res.status(200).send(data);
  },

  readMany: async (req, res) => {
    /*
      #swagger.tags = ["Colors"]
      #swagger.summary = "List Colors"
      #swagger.description = `
        You can send query with endpoint for search[], sort[], page and limit.
        <ul> Examples:
          <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
          <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
          <li>URL/?<b>page=2&limit=1</b></li>
        </ul>`
    */

    const data = await req.queryHandler(Color);
    res.status(200).send(data);
  },

  update: async (req, res) => {
    /*
      #swagger.tags = ["Colors"]
      #swagger.summary = "Update Color"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "name": "String",
          "hexCode": String,
          }
        }
    */

    const data = await Color.findByIdAndUpdate(
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
      #swagger.tags = ["Colors"]
      #swagger.summary = "Delete Color"
    */

    const data = await Color.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount ? 204 : 404).send(data);
  },
};
