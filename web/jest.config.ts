const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig.json')

const paths = pathsToModuleNameMapper(compilerOptions.paths, {
  prefix: '<rootDir>/',
})

module.exports = {
  // usually set by Gatsby, and some components need
  globals: {
    __PATH_PREFIX__: ``,
  },
  // Tells Jest how to handle imports, especially for mocking static file imports which Jest can’t handle
  moduleNameMapper: {
    // Mock stylesheets using the `identity-obj-proxy` package
    '.+\\.(css|less|sass|scss)$': `identity-obj-proxy`,
    // For other static assets, use a manual mock called `file-mock.js` in the `__mocks__` directory
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/__mocks__/file-mock.js`,
    // Use tsconfig paths from the tsconfig.json file
    ...paths,
  },
  // Add a necessary Gatsby global from a file in an array of files that will be included before all tests are run
  setupFiles: [`<rootDir>/loadershim.js`],
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
  // some DOM APIs such as localStorage need a valid URL
  testURL: `http://localhost`,
  // Config Jest so that all js/ts or jsx/tsx files will be transformed using a `jest-preprocess.js` file in the project root
  transform: {
    '^.+\\.[jt]sx?$': '<rootDir>/jest-preprocess.js',
  },
  // necessary because Gatsby includes un-transpiled ES6 code in node_modules
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
}
