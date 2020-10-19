const Joi = require('@hapi/joi');

const { login } = require('./controller');
const { notAuth } = require('middleware/authentication');

module.exports = (server, options) => {
  const { prefix } = options;
  server.route([
    {
      method: 'POST',
      path: `${prefix}/login`,
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
    }
  ]);
};
