"use strict";

const router = require("express").Router();
router.use("/auth", require("./auth.route"));
router.use("/users", require("./user.route"));
router.use("/products", require("./product.route"));
router.use("/variants", require("./variant.route"));
router.use("/colors", require("./color.route"));
router.use("/sizes", require("./size.route"));
router.use("/brands", require("./brand.route"));
router.use("/carts", require("./cart.route"));
router.use("/categories", require("./category.route"));
router.use("/discounts", require("./discount.route"));
router.use("/orders", require("./order.route"));
router.use("/promotions", require("./promotion.route"));
router.use("/reviews", require("./review.route"));
router.use("/stores", require("./store.route"));
router.use("/banners", require("./banner.route"));
router.use("/wishlists", require("./wishlist.route"));
router.use("/documents", require("./document.route"));

module.exports = router;
