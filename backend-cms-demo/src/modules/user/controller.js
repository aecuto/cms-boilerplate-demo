const dao = require('dao/user');
const boom = require('@hapi/boom');
const bcrypt = require('bcryptjs');

const store = async (request, _) => {
  const payload = request.payload;
  const saltRound = parseInt(process.env.SALT_ROUNDS);
  const matchedUserEmail = await dao.getUserFromEmail(payload.email);
  let salt, hashed;
  if (matchedUserEmail) {
    return boom.badRequest('email is exists.');
  }
  try {
    salt = await bcrypt.genSalt(saltRound);
  } catch (err) {
    return boom.badImplementation('generate salt .', err);
  }
  try {
    hashed = await bcrypt.hash(payload.password, salt);
  } catch (err) {
    return boom.badImplementation(
      'something went wrong while encoding password .',
      err
    );
  }
  try {
    const newUser = await dao.create({
      ...payload,
      password: hashed
    });
    return {
      message: 'success updated .',
      id: newUser.id
    };
  } catch (err) {
    return boom.badImplementation(
      'something went wrong while create user .',
      err
    );
  }
};

const show = async (request, _) => {
  const id = request.auth.credentials.user.id;

  try {
    const res = await dao.getById(id);
    if (!res) {
      return boom.notFound('user not found .');
    }

    return dao.getList();
  } catch (err) {
    return boom.badImplementation(
      'something went wrong while get user data .',
      err
    );
  }
};

const edit = async (request, _) => {
  const { id } = request.params;

  try {
    const res = await dao.getById(id);
    if (!res) {
      return boom.notFound('user not found .');
    }

    return res;
  } catch (err) {
    return boom.badImplementation(
      'something went wrong while get user data .',
      err
    );
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
    return boom.notFound('user not found .');
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
    return boom.notFound('user not found .');
  } catch (err) {
    return boom.badImplementation('something went wrong while update .', err);
  }
};

module.exports = {
  store,
  show,
  update,
  edit,
  remove
};
