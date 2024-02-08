"use strict";

module.exports = {
  isLogin: (req, res, next) => {
    if (req.user && req.user.isActive) {
      return next();
    }
    res.errorStatusCode = 403;
    throw new Error("You must be an active user and logged in to access.");
  },

  isAdmin: (req, res, next) => {
    if (req.user && req.user.isActive && req.user.isAdmin) {
      return next();
    }
    res.errorStatusCode = 403;
    throw new Error("You must have admin privileges to access.");
  },

  isStaff: (req, res, next) => {
    if (
      req.user &&
      req.user.isActive &&
      (req.user.isStaff || req.user.isAdmin)
    ) {
      return next();
    }
    res.errorStatusCode = 403;
    throw new Error("You must have admin or staff privileges to access.");
  },
};
