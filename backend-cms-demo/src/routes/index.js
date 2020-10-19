const userRoute = require('modules/user/route');
const authRoute = require('modules/authentication/route');
const adminRoute = require('modules/admin/route');
const userAgentRoute = require('modules/session/route');
const productRoute = require('modules/product/route');

const { notAuth } = require('middleware/authentication');

const router = server => {
  server.route({
    method: 'GET',
    path: '/',
    options: {
      auth: notAuth,
      plugins: {
        blankie: {
          fontSrc: ['self', 'fonts.gstatic.com', 'data:'],
          scriptSrc: ['self', 'unsafe-inline'],
          styleSrc: ['self', 'fonts.googleapis.com', 'unsafe-inline'],
          imgSrc: ['self', 'data:'],
          generateNonces: false
        }
      }
    },
    handler: function(request, h) {
      return h.view('main/index', {
        title: process.env.PROJECT_NAME || 'Hapi Mongoose Boilerplate',
        documentPath: process.env.SWAGGER_PATH
      });
    }
  });

  server.route({
    method: 'GET',
    path: '/health',
    options: {
      auth: notAuth
    },
    handler: function(request, h) {
      return { ok: true };
    }
  });

  // set default as authentication only
  server.auth.default('jwt2');

  authRoute(server);
  userRoute(server);
  adminRoute(server);
  userAgentRoute(server);
  productRoute(server);
};

module.exports = router;
