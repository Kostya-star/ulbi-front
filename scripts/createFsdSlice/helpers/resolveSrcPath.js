const path = require('path');

const resolveSrcPath = (...args) => path.resolve(__dirname, '..', '..', '..', 'src', ...args);

module.exports = { resolveSrcPath };
