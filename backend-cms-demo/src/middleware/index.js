const authenMiddleware = require('./authentication');
const headerHandler = require('./header-handler');

const authentication = server => authenMiddleware.strategy(server);

module.exports = {
  authentication,
  headerHandler
};
