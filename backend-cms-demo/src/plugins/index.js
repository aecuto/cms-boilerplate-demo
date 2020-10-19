const vision = require('@hapi/vision');
const Scooter = require('@hapi/scooter');

const blankie = require('./blankie');
const logger = require('./hapi-logger');
const hapiSentry = require('./hapi-sentry');
const hapiSwagger = require('./hapi-swagger');
const hapiRateLimit = require('./hapi-rate-limit');
const hapiResponseTime = require('hapi-response-time');
const hapiI18n = require('./hapi-i18n');

module.exports = async server => {
  if (process.env.SENTRY_DSN) {
    await server.register(hapiSentry);
  }
  await server.register(logger);
  await server.register(hapiSwagger);
  await server.register(Scooter);
  await server.register(hapiResponseTime);
  await server.register(hapiRateLimit);
  await server.register(blankie);
  await server.register(vision);
  await server.register(hapiI18n);
};
