const hapiI18n = require('hapi-i18n');
const path = require('path');

const localizerOption = {
  locales: ['de', 'en'],
  directory: path.join(__dirname, '/../../constant/locales'),
  languageHeaderField: 'x-localization',
  updateFiles: false,
  autoReload: true,
  api: {
    __: 't'
  }
};

module.exports = {
  plugin: hapiI18n,
  options: localizerOption
};
