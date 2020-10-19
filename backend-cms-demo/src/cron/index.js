const cron = require('node-cron');

const dao = require('dao/user-agent');

module.exports = () => {
  cron.schedule('0 0 * * *', async () => {
    await dao.clearUserAgent();
  });
};
