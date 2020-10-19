'use strict';

require('module-alias/register');
const hapi = require('@hapi/hapi');
const path = require('path');
const mongodb = require('database');
const cron = require('cron');

require('dotenv').config({
  path: path.join(__dirname, '../.env')
});

const router = require('routes');
const handler = require('handler');
const failAction = require('handler/fail-action');
const plugin = require('plugins');
const view = require('view');
const { authentication } = require('middleware');

const server = hapi.server({
  port: process.env.PORT || 8000,
  host: process.env.SERVER_HOST,
  routes: {
    cors: {
      origin: ['*'],
      headers: ['Accept', 'Content-Type'],
      additionalHeaders: ['X-Requested-With', 'Authorization', 'x-localization']
    },
    validate: {
      failAction,
      options: {
        abortEarly: false
      }
    }
  },
  debug: {
    log: ['*']
  }
});

const init = async () => {
  await mongodb();
  await plugin(server);
  await authentication(server);
  await router(server);
  await view(server);
  await handler(server);
  await server.start();
  console.log(`Server running at : ${server.info.uri}`);
  cron();
};

server.events.on('log', (event, tags) => {
  console.log(tags);
});

process.on('unhandledRejection', err => {
  if (err) {
    console.log(err);
    const exit = process.exit;
    exit(1);
  }
});

init();
