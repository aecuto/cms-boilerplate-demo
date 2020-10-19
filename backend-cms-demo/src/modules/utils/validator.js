const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const idValidator = () => Joi.objectId().required();

module.exports = {
  idValidator
};
