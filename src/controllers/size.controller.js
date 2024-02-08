"use strict";

const Size = require("../models/size.model");

module.exports = {
  create: async (req, res) => {
    /*
      #swagger.tags = ["Sizes"]
      #swagger.summary = "Create Size"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "name": "String",
          }
        }
    */

    const data = await Size.create(req.body);
    res.status(201).send(data);
  },

  readOne: async (req, res) => {
    /*
      #swagger.tags = ["Sizes"]
      #swagger.summary = "Get Single Size"
    */

    const data = await Size.findOne({ _id: req.params.id });
    res.status(200).send(data);
  },

  readMany: async (req, res) => {
    /*
      #swagger.tags = ["Sizes"]
      #swagger.summary = "List Sizes"
      #swagger.description = `
        You can send query with endpoint for search[], sort[], page and limit.
        <ul> Examples:
          <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
          <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
          <li>URL/?<b>page=2&limit=1</b></li>
        </ul>`
    */

    const data = await req.queryHandler(Size);
    res.status(200).send(data);
  },

  update: async (req, res) => {
    /*
      #swagger.tags = ["Sizes"]
      #swagger.summary = "Update Size"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "name": "String",
          }
        }
    */

    const data = await Size.findByIdAndUpdate(
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
      #swagger.tags = ["Sizes"]
      #swagger.summary = "Delete Size"
    */

    const data = await Size.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount ? 204 : 404).send(data);
  },
};
