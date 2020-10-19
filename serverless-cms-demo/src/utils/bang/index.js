const createResponse = (statusCode, json) => ({
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  statusCode: statusCode || 501,
  body: JSON.stringify(json)
});

const convertToJson = json => {
  if (typeof json === 'string') {
    return { message: json };
  }

  return json;
};

const ok = json => {
  return createResponse(200, json);
};

const badRequest = (json = 'Bad Request') => {
  return createResponse(400, convertToJson(json));
};

const Unauthorized = (json = 'Unauthorized') => {
  return createResponse(401, convertToJson(json));
};

const Forbidden = (json = 'Forbidden') => {
  return createResponse(403, convertToJson(json));
};

const NotFound = (json = 'Not Found') => {
  return createResponse(404, convertToJson(json));
};

const badImplementation = (json = 'Internal Server Error') => {
  return createResponse(500, convertToJson(json));
};

module.exports = {
  ok,
  badRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  badImplementation
};
