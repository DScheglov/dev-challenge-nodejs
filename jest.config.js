module.exports = {
  testEnvironment: './jest/mongo-env.js',
  collectCoverageFrom: ['./lib/**/*.js'],
  coveragePathIgnorePatterns: ['/node_modules/', '/__test__/'],
  globalSetup: './jest/setup.js',
  globalTeardown: './jest/teardown.js',
};
