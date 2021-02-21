module.exports = {
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',

  testEnvironment: 'node',

  collectCoverageFrom: ['**/src/**/*.js', '!**/src/main/**'],

  preset: '@shelf/jest-mongodb'
}
