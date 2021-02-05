const model = require('../../models/Product');
const queryBuilder = require('../query-builder');

module.exports.getList = async (search, page = 1, perPage = 10, sort) => {
  const currentPage = parseInt(page);
  const sizePage = parseInt(perPage);

  const query = {
    find: search,
    offset: currentPage,
    size: sizePage,
    sort: sort
  };

  const listData = await queryBuilder.getList(model, query);
  const pagination = await queryBuilder.getPagination(
    model,
    query.find,
    currentPage,
    sizePage
  );
  return { data: listData, pagination };
};
