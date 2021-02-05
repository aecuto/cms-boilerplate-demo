const validator = require('validator');

const model = require('../models/Product');
const database = require('../database');
const bang = require('../utils/bang');
const dao = require('../utils/dao/product');

const getList = async (event, context, callback) => {
  try {
    await database();

    let query = {
      search: '',
      page: 1,
      pageSize: 10,
      orderBy: ''
    };

    if (event.queryStringParameters) {
      query = event.queryStringParameters;
    }

    const { search, page, pageSize, orderBy } = query;

    const newSearch = { name: { $regex: search, $options: 'i' } };

    const data = await dao.getList(newSearch, page, pageSize, orderBy);

    if (!data) {
      return bang.NotFound('product not found');
    }

    return bang.ok(data);
  } catch (error) {
    console.error(error);
    return bang.badImplementation();
  }
};

const getInfo = async (event, context, callback) => {
  if (!validator.isAlphanumeric(event.pathParameters.id)) {
    return bang.badRequest('Incorrect id');
  }

  try {
    await database();
    const data = await model.findOne({ _id: event.pathParameters.id });

    if (!data) {
      return bang.NotFound('product not found');
    }

    return bang.ok(data);
  } catch (error) {
    console.error(error);
    return bang.badImplementation('something went wrong while get data.');
  }
};

const create = async (event, context, callback) => {
  const payload = JSON.parse(event.body);

  try {
    await database();
    const data = await model.create(payload);

    if (!data) {
      return bang.badRequest();
    }

    return bang.ok({
      message: 'created successfuly'
    });
  } catch (error) {
    console.error(error);
    return bang.badImplementation('something went wrong while create.');
  }
};

const update = async (event, context, callback) => {
  const data = JSON.parse(event.body);
  const id = event.pathParameters.id;

  if (!validator.isAlphanumeric(id)) {
    return bang.badRequest('Incorrect id');
  }

  try {
    await database();
    const res = await model.findByIdAndUpdate(id, data);

    if (!res) {
      return bang.NotFound('Product not found');
    }

    return bang.ok({ message: 'success to updated.' });
  } catch (error) {
    console.error(error);
    return bang.badImplementation('something went wrong while update.');
  }
};

const remove = async (event, context, callback) => {
  if (!validator.isAlphanumeric(event.pathParameters.id)) {
    return bang.badRequest('Incorrect id');
  }

  try {
    await database();
    const res = await model.remove({ _id: event.pathParameters.id });

    if (!res) {
      return bang.NotFound('Product not found');
    }

    return bang.ok({ message: 'success to deleted.' });
  } catch (error) {
    console.error(error);
    return bang.badImplementation('something went wrong while deleted.');
  }
};

module.exports = {
  getList,
  getInfo,
  create,
  update,
  remove
};
