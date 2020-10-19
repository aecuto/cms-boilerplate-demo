const inert = require('@hapi/inert');
const vision = require('@hapi/vision');
const hapiSwagger = require('hapi-swagger');
const packageJson = require('../../../package.json');

const swaggerOptions = {
  info: {
    title: `${process.env.PROJECT_NAME} API Documentation`,
    version: packageJson.version
  },
  documentationPath: `/${process.env.SWAGGER_PATH || 'documentation'}`,
  documentationRoutePlugins: {
    blankie: {
      fontSrc: ['self', 'fonts.gstatic.com', 'data:'],
      scriptSrc: ['self', 'unsafe-inline'],
      styleSrc: ['self', 'fonts.googleapis.com', 'unsafe-inline'],
      imgSrc: ['self', 'data:'],
      generateNonces: false
    }
  }
};

module.exports = [
  inert,
  vision,
  {
    plugin: hapiSwagger,
    options: swaggerOptions
  }
];
