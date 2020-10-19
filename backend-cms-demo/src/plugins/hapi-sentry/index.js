const Pack = require('../../../package.json');

const sentryOptions = {
  client: {
    dsn: process.env.SENTRY_DSN,
    release: Pack.version,
    environment: process.env.NODE_ENV || 'development'
  }
};

module.exports = {
  plugin: require('hapi-sentry'),
  options: sentryOptions
};
