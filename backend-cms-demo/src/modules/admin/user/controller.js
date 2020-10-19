const boom = require('@hapi/boom');

const dao = require('dao/user');

const get = async (request, _) => {
  const { offset, size } = request.query;
  try {
    return dao.getList(offset, size);
  } catch (err) {
    return boom.badImplementation('something went wrong .', err);
  }
};

const show = async (request, _) => {
  const id = request.params.id;
  try {
    const res = await dao.getById(id);
    if (res) {
      return res;
    }
    return boom.notFound('user not found .');
  } catch (err) {
    return boom.badImplementation(
      'something went wrong while get user data .',
      err
    );
  }
};

const destroy = async (request, _) => {
  const id = request.params.id;
  try {
    return dao.destroy(id);
  } catch (err) {
    return boom.badImplementation('something went wrong while delete .', err);
  }
};

const softDelete = async (request, _) => {
  const id = request.params.id;
  try {
    return dao.softDelete(id);
  } catch (err) {
    return boom.badImplementation('something went wrong wile delete .', err);
  }
};

const restore = async (request, _) => {
  const id = request.params.id;
  try {
    return dao.restore(id);
  } catch (err) {
    boom.badImplementation('something went wrong wile restore user .', err);
  }
};

module.exports = {
  get,
  show,
  destroy,
  softDelete,
  restore
};
