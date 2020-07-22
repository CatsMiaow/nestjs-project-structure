// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('../jest.config');

module.exports = {
  ...config,
  testMatch: [
    '**/e2e/**/*.[jt]s?(x)',
  ],
};
