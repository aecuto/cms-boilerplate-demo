const queryBuilder = require('query-builder');

const modelAdmin = require('models/Admin');

const getList = async (search, page = 1, perPage = 10, sort) => {
  const currentPage = parseInt(page);
  const sizePage = parseInt(perPage);

  const query = {
    find: search,
    offset: currentPage,
    size: sizePage,
    sort: sort
  };
  const listData = await queryBuilder.getList(modelAdmin, query);
  const pagination = await queryBuilder.getPagination(
    modelAdmin,
    query.find,
    currentPage,
    sizePage
  );
  return { data: listData, pagination };
};

const getById = async id => {
  const user = await queryBuilder.getById(modelAdmin, id);
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.createdAt.getTime()
  };
};

const create = async data => {
  const newUser = await queryBuilder.create(modelAdmin, data);
  return newUser;
};

const update = async (id, data) => {
  const res = await queryBuilder.update(modelAdmin, id, data);
  return res;
};

const destroy = async id => {
  const res = await queryBuilder.destroy(modelAdmin, id);
  return res;
};

const softDelete = async id => {
  const res = await queryBuilder.softDelete(modelAdmin, id);
  return res;
};

const restore = async id => {
  const res = await queryBuilder.restore(modelAdmin, id);
  return res;
};

const getUserFromEmail = async email => {
  const query = { email };
  return queryBuilder.getOne(modelAdmin, query);
};

module.exports = {
  getList,
  getById,
  create,
  update,
  destroy,
  getUserFromEmail,
  softDelete,
  restore
};
