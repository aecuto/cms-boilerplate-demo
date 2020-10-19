module.exports = {
  staging: {
    pm2_name: 'service:3000',
    key: '/home/runner/.ssh/deploy_key'
  },
  dev: {
    pm2_name: 'service:3000',
    key: '/home/runner/.ssh/deploy_key'
  },
  production: {
    pm2_name: 'service:3000',
    key: '/home/runner/.ssh/deploy_key'
  }
};
