"use strict";

const Banner = require("../models/banner.model");

module.exports = {
  create: async (req, res) => {
    /*
      #swagger.tags = ["Banners"]
      #swagger.summary = "Create Banner"
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

    const data = await Banner.create(req.body);
    res.status(201).send(data);
  },

  readOne: async (req, res) => {
    /*
      #swagger.tags = ["Banners"]
      #swagger.summary = "Get Single Banner"
    */

    const data = await Banner.findOne({ _id: req.params.id });
    res.status(200).send(data);
  },

  readMany: async (req, res) => {
    /*
      #swagger.tags = ["Banners"]
      #swagger.summary = "List Banners"
      #swagger.description = `
        You can send query with endpoint for search[], sort[], page and limit.
        <ul> Examples:
          <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
          <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
          <li>URL/?<b>page=2&limit=1</b></li>
        </ul>`
    */

    const data = await req.queryHandler(Banner);
    res.status(200).send(data);
  },

  update: async (req, res) => {
    /*
      #swagger.tags = ["Banners"]
      #swagger.summary = "Update Banner"
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

    const data = await Banner.findByIdAndUpdate(
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
      #swagger.tags = ["Banners"]
      #swagger.summary = "Delete Banner"
    */

    const data = await Banner.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount ? 204 : 404).send(data);
  },
};
