const queryBuilder = require('query-builder');

const model = require('models/Product');

const getList = async (search, page = 1, perPage = 10, sort) => {
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

const getById = async id => {
  return queryBuilder.getById(model, id);
};

const create = async data => {
  return queryBuilder.create(model, data);
};

const update = async (id, data) => {
  const res = await queryBuilder.update(model, id, data);
  return res;
};

const destroy = async id => {
  const res = await queryBuilder.destroy(model, id);
  return res;
};

const softDelete = async id => {
  const res = await queryBuilder.softDelete(model, id);
  return res;
};

const restore = async id => {
  try {
    const res = await queryBuilder.restore(model, id);
    return res;
  } catch (err) {
    return undefined;
  }
};

module.exports = {
  getList,
  getById,
  create,
  update,
  destroy,
  softDelete,
  restore
};
