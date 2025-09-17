const moduleAlias = require('module-alias');
moduleAlias.addAlias('@', __dirname);

module.exports = {
  spec: 'tests/**/*.js',
  recursive: true,
  ignore: ['tests/manual-sdk/integration_test/**'],
  exit: true,
};
