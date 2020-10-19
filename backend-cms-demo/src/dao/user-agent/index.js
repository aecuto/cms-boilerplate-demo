const modelUserAgent = require('models/UserAgent');
const moment = require('moment');

const queryBuilder = require('query-builder');

const create = async payload => {
  return queryBuilder.create(modelUserAgent, payload);
};

const destroy = async id => {
  return queryBuilder.destroy(modelUserAgent, id);
};

const getUserAttemptPath = async (userId, path, ip) => {
  const query = {
    user: userId,
    path,
    createdAt: {
      $lte: moment()
        .subtract(process.env.LIMIT_INCORRECT_ATTEMPT_TIME_MIN, 'minutes')
        .toISOString()
    },
    is_fail: true,
    ip
  };
  return queryBuilder.getList(modelUserAgent, query);
};

const get = async payload => {
  return queryBuilder.get(modelUserAgent, payload);
};

const clearUserAgent = async () => {
  const date = moment().subtract(7, 'days');
  const data = { createdAt: { $lt: date } };

  return queryBuilder.clearUserAgent(modelUserAgent, data);
};

module.exports = {
  create,
  destroy,
  get,
  clearUserAgent,
  getUserAttemptPath
};
