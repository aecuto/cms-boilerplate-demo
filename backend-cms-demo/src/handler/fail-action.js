const failAction = async (request, h, err) => {
  if (err.isJoi && Array.isArray(err.details) && err.details.length > 0) {
    const fields = {};
    const fieldsObj = {};
    err.details.forEach((detail, index) => {
      let message = request.i18n.t(detail.type);
      message = message.replace(
        '{#label}',
        request.i18n.t(detail.context.limit)
      );
      message = message.replace('{#limit}', detail.context.limit);
      if (
        detail.context.key === 'password_confirmation' &&
        detail.type === 'any.allowOnly'
      ) {
        message = request.i18n.t(`${detail.type}.password_confirmation`);
      }
      if (detail.path.length <= 1) {
        fields[detail.context.key] = message;
      } else {
        fieldsObj[detail.context.key] = message;
        fields[detail.path[0]] = fieldsObj;
      }
    });
    return h
      .response({
        message: err.output.payload.error,
        fields
      })
      .code(400)
      .takeover();
  }

  return h.response(err).takeover();
};

module.exports = failAction;
