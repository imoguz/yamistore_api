"use strict";

const User = require("../models/user.model");

module.exports = {
  create: async (req, res) => {
    /*
      #swagger.tags = ["Users"]
      #swagger.summary = "Create User"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "firstname": "String",
          "lastname": "String",
          "address": "String",
          "phone": "String",
          "email": "test@mail.com",
          "password": "Test.123",
          "gender": "enum:[Male, Female, Prefer not to say]",
          }
        }
    */

    req.user?.isAdmin === false && (req.body.isAdmin = false);
    const data = await User.create(req.body);

    // const to = data.email,
    //   subject = "Account verification",
    //   html = `
    //     <h3>Dear user,</h3>
    //     <h4>You have been requested to verify your A Company account:</h4>
    //     <h4>Verification Link: http://127.0.0.1:8000/stock/users/verify?id=${
    //       data._id
    //     }&verifyCode=${encrypt(data.email)}</h4>`;
    // sendEmail(to, subject, html);

    data.password = "**********";
    res.status(201).send(data);
  },

  readOne: async (req, res) => {
    /*
      #swagger.tags = ["Users"]
      #swagger.summary = "Get Single User"
    */

    if (req.params.id !== req.user?._id && !req.user?.isAdmin) {
      res.errorStatusCode = 401;
      throw new Error(
        "You do not have permission to view other users' information"
      );
    }
    const data = await User.findOne({ _id: req.params.id });
    res.status(200).send(data);
  },

  readMany: async (req, res) => {
    /*
      #swagger.tags = ["Users"]
      #swagger.summary = "List Users"
      #swagger.description = `
        You can send query with endpoint for search[], sort[], page and limit.
        <ul> Examples:
          <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
          <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
          <li>URL/?<b>page=2&limit=1</b></li>
        </ul>`
    */

    const filter =
      req.user?.isAdmin || req.user?.isStaff ? {} : { _id: req.user?._id };

    const data = await req.queryHandler(User, "", filter);
    res.status(200).send(data);
  },

  update: async (req, res) => {
    /*
      #swagger.tags = ["Users"]
      #swagger.summary = "Update User"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "firstname": "String",
          "lastname": "String",
          "address": "String",
          "phone": "String",
          "email": "test@mail.com",
          "password": "Test.123",
          "gender": "enum:[Male, Female, Prefer not to say]",
          }
        }
    */

    if (req.params.id != req.user?._id && !req.user?.isAdmin) {
      res.errorStatusCode = 401;
      throw new Error(
        "You do not have permission to update other users' information"
      );
    }
    req.user?.isAdmin === false && (req.body.isAdmin = false);
    const data = await User.findByIdAndUpdate(
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
      #swagger.tags = ["Users"]
      #swagger.summary = "Delete User"
    */
    if (req.params.id !== req.user?._id && !req.user?.isAdmin) {
      res.errorStatusCode = 401;
      throw new Error(
        "You do not have permission to delete other users' information"
      );
    }

    const data = await User.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount ? 204 : 404).send(data);
  },
};
