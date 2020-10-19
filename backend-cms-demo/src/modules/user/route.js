const Joi = require('@hapi/joi');

const { store, show, update, edit, remove } = require('./controller');

const routes = server => {
  const routePrefix = 'users';

  // resource
  server.route([
    {
      method: 'POST',
      path: `/${routePrefix}`,
      options: {
        validate: {
          payload: Joi.object({
            name: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required()
          })
        },
        tags: ['api']
      },
      handler: store
    },
    {
      method: 'GET',
      path: `/${routePrefix}`,
      handler: show,
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
      method: 'GET',
      path: `/${routePrefix}/{id}/edit`,
      handler: edit,
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
            email: Joi.string().required()
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
