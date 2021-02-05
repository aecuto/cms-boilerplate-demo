const validator = require('validator');
const bcrypt = require('bcryptjs');

const model = require('../models/User');
const database = require('../database');
const bang = require('../utils/bang');

const getList = async (event, context, callback) => {
  try {
    await database();
    const data = await model.find();

    if (!data) {
      return bang.NotFound('user not found');
    }

    return bang.ok(data);
  } catch (error) {
    return bang.badImplementation();
  }
};

const getInfo = async (event, context, callback) => {
  if (!validator.isAlphanumeric(event.pathParameters.id)) {
    return bang.badRequest('Incorrect id');
  }

  try {
    await database();
    const data = await model.find({ _id: event.pathParameters.id });

    if (!data) {
      return bang.NotFound('user not found');
    }

    return bang.ok(data);
  } catch (error) {
    console.error(error);
    return bang.badImplementation();
  }
};

const edit = async (event, context, callback) => {
  if (!validator.isAlphanumeric(event.pathParameters.id)) {
    return bang.badRequest('Incorrect id');
  }

  try {
    await database();
    const data = await model.findOne({ _id: event.pathParameters.id });

    if (!data) {
      return bang.NotFound('user not found');
    }

    const newData = {
      id: data.id,
      name: data.name,
      email: data.email,
      created_at: data.createdAt.getTime()
    };

    return bang.ok(newData);
  } catch (error) {
    console.error(error);
    return bang.badImplementation();
  }
};

const create = async (event, context, callback) => {
  await database();

  const payload = JSON.parse(event.body);
  const saltRound = parseInt(process.env.SALT_ROUNDS);
  const matchedUserEmail = await model.findOne({ email: payload.email });

  let salt, hashed;
  if (matchedUserEmail) {
    return bang.badRequest('email is exists.');
  }

  try {
    salt = await bcrypt.genSalt(saltRound);
  } catch (error) {
    console.error(error);
    return bang.badImplementation();
  }

  try {
    hashed = await bcrypt.hash(payload.password, salt);
  } catch (error) {
    console.error(error);
    return bang.badImplementation();
  }

  try {
    const newUser = await model.create({
      ...payload,
      password: hashed
    });

    return bang.ok({
      message: 'created successfuly',
      id: newUser.id
    });
  } catch (error) {
    console.error(error);
    return bang.badImplementation();
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
      return bang.NotFound('user not found');
    }

    return bang.ok({ message: 'success to updated.' });
  } catch (error) {
    console.error(error);
    return bang.badImplementation();
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
      return bang.NotFound('user not found');
    }

    return bang.ok({ message: 'success to deleted.' });
  } catch (error) {
    console.error(error);
    return bang.badImplementation();
  }
};

module.exports = {
  getList,
  getInfo,
  create,
  update,
  remove,
  edit
};
