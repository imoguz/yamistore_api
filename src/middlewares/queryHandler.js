"use strict";

module.exports = (req, res, next) => {
  req.queryHandler = async (modelName, Populate, filter) => {
    let search = req.query?.search || {};
    for (let key in search)
      search[key] = { $regex: search[key], $options: "i" };
    const sort = req.query?.sort || {};
    let page = +req.query?.page > 0 ? req.query?.page - 1 : 0;
    let limit = +req.query?.limit > 0 ? req.query?.limit : 0;

    search = { ...search, ...filter };

    return await modelName
      .find(search)
      .sort(sort)
      .skip(page * limit)
      .limit(limit)
      .populate(Populate);
  };

  next();
};
