const Joi = require('@hapi/joi');
const { idValidator } = require('modules/utils/validator');

const { get, show, destroy, softDelete, restore } = require('./controller');

const routes = (server, options) => {
  const { prefix, strategy } = options;
  const routePrefix = `${prefix}/users`;

  // resource
  server.route([
    {
      method: 'GET',
      path: `${routePrefix}`,
      handler: get,
      options: {
        auth: strategy,
        tags: ['api'],
        validate: {
          headers: Joi.object({
            authorization: Joi.string().required()
          }).unknown()
        }
      }
    },

    {
      method: 'GET',
      path: `${routePrefix}/{id}`,
      handler: show,
      options: {
        auth: strategy,
        validate: {
          headers: Joi.object({
            authorization: Joi.string().required()
          }).unknown(),
          params: Joi.object({
            id: idValidator()
          })
        },
        tags: ['api']
      }
    },
    {
      method: 'DELETE',
      path: `${routePrefix}/{id}`,
      handler: destroy,
      options: {
        auth: strategy,
        validate: {
          headers: Joi.object({
            authorization: Joi.string().required()
          }).unknown(),
          params: Joi.object({
            id: idValidator()
          })
        },
        tags: ['api']
      }
    },
    {
      method: 'DELETE',
      path: `${routePrefix}/{id}/soft`,
      handler: softDelete,
      options: {
        auth: strategy,
        validate: {
          headers: Joi.object({
            authorization: Joi.string().required()
          }).unknown(),
          params: Joi.object({
            id: idValidator()
          })
        },
        tags: ['api']
      }
    },
    {
      method: 'PATCH',
      path: `${routePrefix}/{id}/restore`,
      handler: restore,
      options: {
        auth: strategy,
        validate: {
          headers: Joi.object({
            authorization: Joi.string().required()
          }).unknown(),
          params: Joi.object({
            id: idValidator()
          })
        },
        tags: ['api']
      }
    }
  ]);
};

module.exports = routes;
