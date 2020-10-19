const queryBuilder = require('query-builder');

const modelUser = require('models/User');

const getList = async (search, page = 1, perPage = 10, sort) => {
  const currentPage = parseInt(page);
  const sizePage = parseInt(perPage);

  const query = {
    find: search,
    offset: currentPage,
    size: sizePage,
    sort: sort
  };
  const listData = await queryBuilder.getList(modelUser, query);
  const pagination = await queryBuilder.getPagination(
    modelUser,
    query.find,
    currentPage,
    sizePage
  );
  return { data: listData, pagination };
};

const getById = async id => {
  const user = await queryBuilder.getById(modelUser, id);
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.createdAt.getTime()
  };
};

const create = async data => {
  const newUser = await queryBuilder.create(modelUser, data);
  return newUser;
};

const update = async (id, data) => {
  const res = await queryBuilder.update(modelUser, id, data);
  return res;
};

const destroy = async id => {
  const res = await queryBuilder.destroy(modelUser, id);
  return res;
};

const softDelete = async id => {
  const res = await queryBuilder.softDelete(modelUser, id);
  return res;
};

const restore = async id => {
  try {
    const res = await queryBuilder.restore(modelUser, id);
    return res;
  } catch (err) {
    return undefined;
  }
};

const getUserFromEmail = async email => {
  const query = { email };
  return queryBuilder.getOne(modelUser, query);
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
