const NodeEnvironment = require('jest-environment-node'); // eslint-disable-line import/no-extraneous-dependencies

const path = require('path');

const fs = require('fs');

const globalConfigPath = path.join(__dirname, 'globalConfig.json');

class MongoEnvironment extends NodeEnvironment {
  async setup() {
    // expected prepared by global setup
    const globalConfig = JSON.parse(fs.readFileSync(globalConfigPath, 'utf-8'));

    this.global.TEST_MONGO_URI = globalConfig.mongoUri;

    await super.setup();
  }

  async teardown() {
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = MongoEnvironment;
