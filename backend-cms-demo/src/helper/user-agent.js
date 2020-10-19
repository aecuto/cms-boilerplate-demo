const geoip = require('geoip-lite');
const requestIp = require('request-ip');
const _ = require('lodash');

const dao = require('dao/user-agent');

const create = async payload => {
  const { userAgent, user, request, isFail } = payload;
  const { os } = userAgent;
  const browser = await _.omit(userAgent, ['os']);
  const ip = requestIp.getClientIp(request);
  const path = request.path;

  let location = null;
  try {
    location = await geoip.lookup(ip);
  } catch (error) {}

  return dao.create({
    user,
    browser,
    os,
    ip,
    location,
    path,
    is_fail: isFail
  });
};

const destroy = async id => {
  return dao.destroy(id);
};

const clearUserAgent = async () => {
  return dao.clearUserAgent();
};

module.exports = {
  create,
  destroy,
  clearUserAgent
};
