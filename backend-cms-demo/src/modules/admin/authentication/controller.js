const adminDao = require('dao/admin');
const boom = require('@hapi/boom');
const bcrypt = require('bcryptjs');
const { generateToken } = require('helper/jwt');

const login = async (request, h) => {
  const { email, password } = request.payload;
  const { getUserFromEmail } = adminDao;
  const errorMessage = 'Email or password is incorrect .';
  try {
    const user = await getUserFromEmail(email);

    if (!user) {
      return boom.badRequest(errorMessage);
    }

    const isPasswordMatch = bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return boom.badRequest(errorMessage);
    }
    // expired 7 day
    return {
      token: generateToken({ userId: user.id }, 60 * 24 * 7)
    };
  } catch (err) {
    console.log(err);
    return boom.badRequest(errorMessage);
  }
};

module.exports = {
  login
};
