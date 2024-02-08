"use strict";

const router = require("express").Router();
const { isLogin, isStaff, isAdmin } = require("../middlewares/permissions");
const {
  create,
  readOne,
  readMany,
  update,
  _delete,
} = require("../controllers/wishlist.controller");

router.route("/").get(readMany).post(create);
router.route("/:id").get(readOne).put(update).delete(_delete);

module.exports = router;
