const handlebars = require('handlebars');
const path = require('path');

module.exports = async server => {
  await server.views({
    engines: { html: handlebars },
    relativeTo: __dirname,
    path: path.resolve(__dirname)
  });

  await server.route({
    path: '/assets/{path*}',
    method: 'GET',
    options: {
      auth: false
    },
    handler: {
      directory: {
        path: path.join(__dirname, './assets/'),
        listing: false,
        index: false
      }
    }
  });
};
