const daoUser = require('dao/user');
// const daoUserAgent = require('dao/user-agent');
const daoAdmin = require('dao/admin');

// middleware authentication

const strategy = server => {
  server.register(require('hapi-auth-jwt2'));
  server.auth.strategy('jwt2', 'jwt', {
    key: [process.env.JWT_SECRET],
    mode: 'optional',
    validate: async (credentials, request) => {
      const user = await daoUser.getById(credentials.sub);
      // const userAgent = await daoUserAgent.getByAgentAndUser(
      //   credentials.v,
      //   credentials.sub
      // );
      if (!user) {
        return {
          isValid: false
        };
      }
      credentials.user = user;
      return {
        isValid: true,
        credentials
      };
    }
  });

  server.auth.strategy('admin', 'jwt', {
    key: [process.env.JWT_SECRET],
    mode: 'optional',
    validate: async (credentials, request) => {
      const admin = await daoAdmin.getById(credentials.sub);
      if (!admin) {
        return {
          isValid: false
        };
      }
      credentials.user = admin;
      return {
        isValid: true,
        credentials
      };
    }
  });
};

// adding scope or role you want to have

const authAdmin = {
  scope: 'admin'
};

const notAuth = false;

const auth = {};

module.exports = {
  strategy,
  authAdmin,
  notAuth,
  auth
};
