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

  let listData = await queryBuilder.getList(model, query);
  const pagination = await queryBuilder.getPagination(
    model,
    query.find,
    currentPage,
    sizePage
  );

  // fixed material-table bug
  if (!listData.length && currentPage !== 1) {
    pagination.current_page = currentPage - 1;
    query.offset = currentPage - 1;
    listData = await queryBuilder.getList(model, query);
  }

  return { results: listData, pagination };
};
