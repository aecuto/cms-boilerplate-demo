const { get } = require('lodash');

const onPreResponse = (request, h, err) => {
  const response = request.response;
  if (!response.isBoom) {
    return h.continue;
  }
  if (response.output.statusCode === 413) {
    return h
      .response({
        statusCode: 413,
        message: response.output.payload.error,
        fields: request.i18n.t('max_size_file')
      })
      .code(413)
      .takeover();
  }
  if (response.message) {
    const cutSting = response.message.split(':');
    response.output.payload.message = cutSting[0];
    if (get(response, ['data']) && response.message === 'fields') {
      return h
        .response({
          statusCode: 400,
          message: response.output.payload.error,
          fields: response.data
        })
        .code(400)
        .takeover();
    }
  }

  return h.continue;
  // for custom response in this location
};

module.exports = onPreResponse;
