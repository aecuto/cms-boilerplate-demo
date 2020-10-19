const Joi = require('@hapi/joi');

const { login, me } = require('./controller');
const { notAuth } = require('middleware/authentication');

module.exports = server => {
  server.route([
    {
      method: 'POST',
      path: `/login`,
      options: {
        auth: notAuth,
        tags: ['api'],
        validate: {
          payload: Joi.object({
            email: Joi.string()
              .email()
              .required(),
            password: Joi.string().required()
          })
        }
      },
      handler: login
    },
    {
      method: 'GET',
      path: `/me`,
      options: {
        tags: ['api'],
        validate: {
          headers: Joi.object({
            authorization: Joi.string().required()
          }).unknown()
        }
      },
      handler: me
    }
  ]);
};
