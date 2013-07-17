var requirejs = require('requirejs');

requirejs.config({
  baseUrl: '.',
  nodeRequire: require
});

module.exports = requirejs('./src/parser');
