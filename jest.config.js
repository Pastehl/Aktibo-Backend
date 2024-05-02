module.exports = {
    transform: {
      '^.+\\.js$': 'babel-jest'
    },
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        "\\.(scss)$": "identity-obj-proxy"
      }
  };
  