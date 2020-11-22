const path = require('path');
module.exports = {
  rootDir: path.resolve(path.dirname(__dirname), './import-service'),
  setupFiles: ['<rootDir>/setupJest.ts'],
  modulePaths: ['<rootDir>/'],
};
