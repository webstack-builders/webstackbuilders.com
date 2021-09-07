import type { Config } from '@jest/types'
import sharedConfig, { mappings } from '../jest.config'

export default async (): Promise<Config.InitialOptions> => {
  return {
    ...sharedConfig,
    // Print a label alongside a test while it is running.
    displayName: {
      name: 'STUDIO',
      color: 'blue',
    },
    // A webpack loader plugin takes care of loading static file imports like CSS or jpg
    // files in the dev server or production builds. This mocks static file imports that
    // Jest can't handle, and uses mappings from the `path` key in `tsconfig` files.
    moduleNameMapper: {
      // Mock stylesheets using the `identity-obj-proxy` package.
      '.+\\.(css|less|sass|scss)$': `identity-obj-proxy`,
      // For other static assets, use a manual mock called `file-mock.js` in the `__mocks__` directory
      '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/__mocks__/file-mock.js`,
      // Use tsconfig paths from the tsconfig.json file.
      ...mappings(__dirname),
    },
    // Default is 'node'.
    testEnvironment: 'jsdom',
  }
}
