const boom = require('@hapi/boom');
const bcrypt = require('bcryptjs');
const requestIp = require('request-ip');

const userDao = require('dao/user');
const userAgentDao = require('dao/user-agent');
const userAgentHelper = require('helper/user-agent');
const { generateToken } = require('helper/jwt');

const login = async (request, h) => {
  const { email, password } = request.payload;
  const { getUserFromEmail } = userDao;
  const errorMessage = 'Email or password is incorrect.';
  try {
    const user = await getUserFromEmail(email);

    if (!user) {
      return boom.badRequest(errorMessage);
    }

    const ip = requestIp.getClientIp(request);
    const attemptTime = await userAgentDao.getUserAttemptPath(
      user._id,
      request.path,
      ip
    );

    if (attemptTime.length > process.env.LIMIT_INCORRECT_ATTEMPT_ROUND) {
      return boom.locked('To control abuse, please try again in few minute', {
        wait_for: 3
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      await userAgentHelper.create({
        userAgent: request.plugins.scooter,
        user: user._id,
        request,
        isFail: true
      });
      return boom.badRequest(errorMessage);
    }
    // user agent
    const v = await userAgentHelper.create({
      userAgent: request.plugins.scooter,
      user: user._id,
      request
    });
    // expired 7 day
    return {
      token: generateToken({ userId: user.id, v: v._id }, 60 * 24 * 7)
    };
  } catch (err) {
    console.log(err);
    return boom.badRequest(errorMessage);
  }
};

const me = async (request, h) => {
  return request.auth.credentials.user;
};

module.exports = {
  login,
  me
};
