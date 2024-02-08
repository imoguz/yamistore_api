"use strict";

module.exports = (req, res, next) => {
  req.queryHandlerProduct = async (modelName, Populate) => {
    const {
      subcategory,
      midcategory,
      topcategory,
      search,
      page,
      limit,
      filteroptions,
      sort,
    } = req.query;

    const searchQuery = search
      ? { name: { $regex: search.trim().split(" ").join("|"), $options: "i" } }
      : {};

    const sortby = sort ? { [Object.keys(sort)[0]]: +Object.values(sort) } : {};

    const data = await modelName
      .find(searchQuery)
      .sort(sortby)
      .populate(Populate);

    if (!data) return;

    let filteredData;
    let pagination;

    const filterByCategoriesFn = () => {
      if (topcategory && midcategory && subcategory) {
        return data.filter(
          ({ category }) =>
            category.name === subcategory &&
            category.parentCategory.name === midcategory &&
            category.parentCategory.parentCategory.name === topcategory
        );
      } else if (topcategory && midcategory) {
        return data.filter(
          ({ category }) =>
            category.parentCategory.name === midcategory &&
            category.parentCategory.parentCategory.name === topcategory
        );
      } else if (topcategory) {
        return data.filter(
          ({ category }) =>
            category.parentCategory.parentCategory.name === topcategory
        );
      }
    };

    const filterByFilterOptionsFn = () => {
      const { Color, Size, Price, Discount, Brand } = filteroptions;
      const discountMd =
        Discount &&
        Discount?.length > 0 &&
        Discount.map((item) => Number.parseFloat(item));
      return filteredData?.filter((product) => {
        const isColorMatch =
          Color && Color?.length > 0
            ? product?.variants?.find((variant) =>
                Color.includes(variant.color_id.name)
              )
            : true;
        const isSizeMatch =
          Size && Size?.length > 0
            ? product?.variants?.find((variant) =>
                Size.includes(variant.size_id.name)
              )
            : true;
        const isBrandMatch =
          Brand && Brand?.length > 0
            ? Brand.includes(product.brand.name)
            : true;
        const isDiscountMatch =
          Discount && Discount?.length > 0
            ? discountMd.includes(product.discount.amount)
            : true;

        const isPriceMatch =
          Price && Price.length > 0
            ? Price.some((item) => {
                const [min, maxString] = item
                  .split("-")
                  .map((value) => Number(value.trim().slice(1)));
                const max = isNaN(maxString) ? Infinity : maxString;
                return product.price >= min && product.price <= max;
              })
            : true;

        return (
          isColorMatch &&
          isSizeMatch &&
          isBrandMatch &&
          isDiscountMatch &&
          isPriceMatch
        );
      });
    };

    const paginationFn = () => {
      if (page && limit) {
        if (page < 1 || limit < 1)
          return {
            error: "Invalid parameter values",
            message:
              "The 'page' and 'limit' parameters must be greater than or equal to 1.",
          };
        pagination = filteredData.filter(
          (_, index) => index >= (+page - 1) * +limit && index < +page * +limit
        );
      }
    };

    filteredData = topcategory ? filterByCategoriesFn() : data;

    if (filteroptions && Object.keys(filteroptions)?.length > 0)
      filteredData = filterByFilterOptionsFn();

    paginationFn();

    return {
      pageSize: pagination ? pagination.length : filteredData.length,
      totalRecords: filteredData ? filteredData.length : data.length,
      pages: {
        total: Math.ceil(
          filteredData ? filteredData.length / +limit : data.length / +limit
        ),
        previous: +page > 1 ? +page - 1 : false,
        current: +page,
        next:
          Math.ceil(
            filteredData ? filteredData.length / +limit : data.length / +limit
          ) > +page
            ? +page + 1
            : false,
      },
      data: pagination ? pagination : filteredData,
    };
  };

  next();
};
