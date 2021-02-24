const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const moment = require('moment');
dotenv.config();

const UserModel = require('../models/User');
const database = require('../database');
const bang = require('../utils/bang');

const signJwtToken = user => {
  return jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

module.exports.login = async (event, context, callback) => {
  const { email, password } = JSON.parse(event.body);
  const errorMessage = 'Email or password is incorrect.';

  try {
    await database();
    const user = await UserModel.findOne({ email });

    if (!user) {
      return bang.badRequest(errorMessage);
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return bang.badRequest(errorMessage);
    }

    const token = signJwtToken(user);

    return bang.ok({ token });
  } catch (error) {
    console.error(error);
    return bang.badImplementation();
  }
};

const buildIAMPolicy = (userId, effect, context) => {
  const policy = {
    principalId: userId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: '*'
        }
      ]
    },
    context
  };

  return policy;
};

module.exports.authorize = async (event, context, callback) => {
  const token = event.authorizationToken.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = decoded.user;

    const effect = user ? 'Allow' : 'Deny';
    const userId = user._id;
    const authorizerContext = { user: JSON.stringify(user) };

    return buildIAMPolicy(userId, effect, authorizerContext);
  } catch (error) {
    return bang.badImplementation();
  }
};

module.exports.me = async (event, context, callback) => {
  const user = JSON.parse(event.requestContext.authorizer.user);

  return bang.ok(user);
};

module.exports.refreshToken = async (event, context, callback) => {
  try {
    const token = event.headers.Authorization.replace('Bearer ', '');

    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      ignoreExpiration: true
    });

    const exp = moment(decoded.exp * 1000);
    const currentDate = moment();
    const diffInMs = currentDate.diff(exp);
    const tokenStatus = diffInMs > 0 ? 'token expired' : 'ok';

    if (moment.duration(diffInMs).asMinutes() < 2) {
      const refreshToken = signJwtToken(decoded.user);
      return bang.ok({ tokenStatus, refreshToken });
    } else {
      return bang.Unauthorized();
    }
  } catch (error) {
    console.error(error);
    return bang.badImplementation();
  }
};
