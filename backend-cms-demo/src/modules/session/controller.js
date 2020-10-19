const dao = require('dao/user-agent');

const get = async (request, h) => {
  return dao.get({
    user: request.auth.credentials.user._id,
    query: request.query
  });
};

const destroy = async (request, h) => {
  return dao.destroy(request.params.id);
};

module.exports = {
  get,
  destroy
};
