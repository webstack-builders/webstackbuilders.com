module.exports = {
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  // This is to set up a directory for Istanbul code coverage reporting output:
  coverageDirectory: 'coverage',
}
