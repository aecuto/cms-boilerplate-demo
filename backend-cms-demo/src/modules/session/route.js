const Joi = require('@hapi/joi');

const { idValidator } = require('modules/utils/validator');

const { get, destroy } = require('./controller');

module.exports = server => {
  server.route([
    {
      method: 'POST',
      path: `/security/session`,
      options: {
        tags: ['api'],
        validate: {
          headers: Joi.object({
            authorization: Joi.string().required()
          }).unknown(),
          query: Joi.object({
            size: Joi.number().min(1),
            offset: Joi.number().min(0)
          })
        }
      },
      handler: get
    },
    {
      method: 'DELETE',
      path: `/security/session/{id}`,
      options: {
        tags: ['api'],
        validate: {
          headers: Joi.object({
            authorization: Joi.string().required()
          }).unknown(),
          params: Joi.object({
            id: idValidator()
          })
        }
      },
      handler: destroy
    }
  ]);
};
