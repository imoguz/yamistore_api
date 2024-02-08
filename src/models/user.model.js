"use strict";

const validator = require("validator");
const hashedPassword = require("../helpers/passwordEncrypt");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },

    lastname: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: [true, "This email is already used."],
      validate: {
        validator: (email) => validator.isEmail(email),
        message: "Please enter a valid email",
      },
    },

    password: {
      type: String,
      required: true,
      trim: true,
      select: false,
      validate: {
        validator: function (password) {
          if (
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@#!%*?.&])[A-Za-z\d$@$!%*?.&]{8,32}/.test(
              password
            )
          ) {
            return (this.password = hashedPassword(password));
          } else {
            return false;
          }
        },
        message:
          "Invalid password format: min 8 max 32 upper 1 lower 1 special 1 number 1",
      },
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Prefer not to say"],
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
