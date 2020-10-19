'use strict';

const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const _ = require('lodash');

const blacklist = ['password'];
const maskJson = require('mask-json')(blacklist, { replacement: '*****' });

const { combine, timestamp, colorize, printf } = format;

const hapiLogger = {
  name: 'hapi-logger',
  version: '1.0.0',
  register: (server, options) => {
    server.ext('onPreResponse', preResponse);
  }
};

const getrResponseTime = headers => {
  const start = parseInt(headers['x-req-start']);
  const end = new Date().getTime();
  const responseTime = `${end - start} ms`;

  return responseTime;
};

const errorLoggerFormat = request => {
  return maskJson({
    pid: process.pid,
    method: request.method,
    url: request.path,
    headers: request.headers,
    info: request.info,
    auth: request.auth,
    query: request.query,
    params: request.params,
    payload: request.payload,
    responseTime: getrResponseTime(request.headers),
    response: _.omit(request.response, ['reformat', 'typeof', 'raw'])
  });
};

const infoLoggerFormat = request => {
  const statusCode = request.response.statusCode;
  return maskJson({
    pid: process.pid,
    method: request.method,
    url: request.path,
    statusCode,
    headers: request.headers,
    info: request.info,
    auth: request.auth,
    mime: request.mime,
    query: request.query,
    params: request.params,
    payload: request.payload,
    responseTime: getrResponseTime(request.headers)
  });
};

const errorMessage = request => {
  return `[${request.method.toUpperCase()}] ${request.path} -> ${
    request.response.message
  }`;
};

const infoMessage = request => {
  return `[${request.method.toUpperCase()}] ${request.path} -> StatusCode: ${
    request.response.statusCode
  }`;
};

const preResponse = (request, h) => {
  const response = request.response;
  if (response.isBoom) {
    logger.error(errorMessage(request), errorLoggerFormat(request));
  } else {
    logger.info(infoMessage(request), infoLoggerFormat(request));
  }

  return h.continue;
};

const displayConsole = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] : ${message}`;
});

const options = {
  console: {
    handleExceptions: true,
    format: combine(timestamp(), colorize(), displayConsole)
  }
};

const logger = createLogger({
  format: format.json(),
  transports: [
    new DailyRotateFile({
      dirname: 'logs',
      filename: 'info-%DATE%.log',
      maxSize: '100m',
      maxFiles: '1d',
      level: 'info'
    }),
    new transports.Console(options.console)
  ]
});

module.exports = hapiLogger;
