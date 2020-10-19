const authRoute = require('./authentication/route');
const userRoute = require('./user/route');

const options = { prefix: '/admin', middleware: 'admin', strategy: 'admin' };

module.exports = server => {
  authRoute(server, options);
  userRoute(server, options);
};
