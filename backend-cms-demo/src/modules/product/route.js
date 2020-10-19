const Joi = require('@hapi/joi');

const { store, getList, update, remove } = require('./controller');

const routes = server => {
  const routePrefix = 'products';

  // resource
  server.route([
    {
      method: 'POST',
      path: `/${routePrefix}`,
      options: {
        validate: {
          payload: Joi.object({
            name: Joi.string().required(),
            company: Joi.string().required(),
            status: Joi.string().required()
          })
        },
        tags: ['api']
      },
      handler: store
    },
    {
      method: 'GET',
      path: `/${routePrefix}`,
      handler: getList,
      options: {
        validate: {
          headers: Joi.object({
            authorization: Joi.string().required()
          }).unknown()
        },
        tags: ['api']
      }
    },
    {
      method: 'PUT',
      path: `/${routePrefix}/{id}/update`,
      handler: update,
      options: {
        validate: {
          headers: Joi.object({
            authorization: Joi.string().required()
          }).unknown(),
          params: Joi.object({
            id: Joi.string().required()
          }),
          payload: Joi.object({
            name: Joi.string().required(),
            company: Joi.string().required(),
            status: Joi.string().required()
          })
        },
        tags: ['api']
      }
    },
    {
      method: 'DELETE',
      path: `/${routePrefix}/{id}/delete`,
      handler: remove,
      options: {
        validate: {
          headers: Joi.object({
            authorization: Joi.string().required()
          }).unknown(),
          params: Joi.object({
            id: Joi.string().required()
          })
        },
        tags: ['api']
      }
    }
  ]);
};

module.exports = routes;
