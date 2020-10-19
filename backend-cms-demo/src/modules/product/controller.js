const dao = require('dao/product');
const boom = require('@hapi/boom');

const store = async (request, _) => {
  const payload = request.payload;
  try {
    const res = await dao.create(payload);
    if (res) {
      return { message: 'success to updated .' };
    }
    return boom.notFound('product not found .');
  } catch (err) {
    return boom.badImplementation('something went wrong while update .', err);
  }
};

const getList = async (request, _) => {
  try {
    const res = await dao.getList();
    if (!res) {
      return boom.notFound('product not found .');
    }

    return dao.getList();
  } catch (err) {
    return boom.badImplementation('something went wrong while get data.', err);
  }
};

const update = async (request, _) => {
  const { id } = request.params;
  const payload = request.payload;
  try {
    const res = await dao.update(id, payload);
    if (res) {
      return { message: 'success to updated .' };
    }
    return boom.notFound('product not found .');
  } catch (err) {
    return boom.badImplementation('something went wrong while update .', err);
  }
};

const remove = async (request, _) => {
  const { id } = request.params;

  try {
    const res = await dao.destroy(id);
    if (res) {
      return { message: 'success to delete.' };
    }
    return boom.notFound('product not found .');
  } catch (err) {
    return boom.badImplementation('something went wrong while update .', err);
  }
};

module.exports = {
  store,
  getList,
  update,
  remove
};
