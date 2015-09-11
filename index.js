var requirejs = require('requirejs');

requirejs.config({
  baseUrl: __dirname,
  nodeRequire: require
});

module.exports = requirejs('./src/parser');
