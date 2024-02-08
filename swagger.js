"use strict";

const packagejson = require("./package.json");
const autogen = require("swagger-autogen")();

require("dotenv").config();
const HOST = process.env?.HOST || "127.0.0.1";
const PORT = process.env?.PORT || 8080;

const document = {
  info: {
    version: packagejson.version,
    title: packagejson.name,
    description: packagejson.description,
    termsOfService: "https://portfolio-imoguz.vercel.app/",
    contact: { name: packagejson.author, email: "imoguz0510@gmail.com" },
    license: { name: packagejson.license },
  },
  host: `${HOST}:${PORT}`,
  basePath: "/",
  schemes: ["http", "https"],
  securityDefinitions: {
    JWT: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description:
        "Enter Your AccessToken (JWT) for Login. Example: <b>Bearer <i>...token...<i></b>",
    },
  },
  security: [{ JWT: true }],
  definition: {
    "/auth/login": {
      username: {
        type: "String",
        required: true,
      },
      password: {
        type: "String",
        required: true,
      },
    },
    "/auth/refresh": {
      "token.refresh": {
        description: "{ token: { refresh: ... } }",
        type: "String",
        required: true,
      },
    },
    Banner: require("./src/models/banner.model").schema.obj,
    Brand: require("./src/models/brand.model").schema.obj,
    Cart: require("./src/models/cart.model").schema.obj,
    Category: require("./src/models/category.model").schema.obj,
    Color: require("./src/models/color.model").schema.obj,
    Discount: require("./src/models/discount.model").schema.obj,
    Order: require("./src/models/order.model").schema.obj,
    Product: require("./src/models/product.model").schema.obj,
    Promotion: require("./src/models/promotion.model").schema.obj,
    Review: require("./src/models/review.model").schema.obj,
    Size: require("./src/models/size.model").schema.obj,
    Store: require("./src/models/store.model").schema.obj,
    User: require("./src/models/user.model").schema.obj,
    Variant: require("./src/models/variant.model").schema.obj,
    Wishlist: require("./src/models/wishlist.model").schema.obj,
  },
};
const routes = ["./index.js"];
const outputFile = "./src/configs/swagger.json";

autogen(outputFile, routes, document);
