import type { Config } from '@jest/types'
import sharedConfig, { mappings } from '../jest.config'

export default async (): Promise<Config.InitialOptions> => {
  return {
    ...sharedConfig,
    // Print a label alongside a test while it is running.
    displayName: {
      name: 'WEB',
      color: 'blue',
    },
    // Global variables that need to be available in all test environments.
    globals: {
      // set by Gatsby and needed by some components.
      __PATH_PREFIX__: '',
    },
    // In dev server and production builds, a webpack loader plugin takes care of loading
    // static file imports like CSS or jpg files. This mocks static file imports that Jest
    // can't handle, and also provides mappings from the `path` key in `tsconfig` files.
    moduleNameMapper: {
      // Mock stylesheets using the `identity-obj-proxy` package.
      '.+\\.(css|less|sass|scss)$': `identity-obj-proxy`,
      // For other static assets, use a manual mock called `file-mock.js` in the `__mocks__` directory
      '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/__mocks__/file-mock.js`,
      // Use tsconfig paths from the tsconfig.json file.
      ...mappings(__dirname),
    },
    // Files to run once per test file in its own environment, executed in the testing environment immediately before executing the test code itself.
    setupFiles: ['<rootDir>/loadershim.js'],
    // Default is 'node'.
    testEnvironment: 'jsdom',
    // Necessary because Gatsby includes un-transpiled ES6 code in node_modules.
    transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  }
}
