import path from 'path'
import { resolveSync } from 'tsconfig'
import getJestMappersFromTSConfig from 'tsconfig-paths-jest-mapper'

/**
 * Base Jest testing config for project
 */
const sharedConfig = {
  // Directory where Jest should store its cached dependency information.
  cacheDirectory: path.join(__dirname, '.cache'),
  // Files and directories to collect code coverage stats from
  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}'],
  // Directory where Jest should output its coverage files.
  coverageDirectory: path.join(__dirname, 'coverage'),
  coveragePathIgnorePatterns: [
    '**/node_modules/**',
    '**/.cache/**',
    '**/__generated__/**',
    '**/__mocks__/**',
    '**/coverage/**',
    '**/serviceWorker.js',
    '**/index.js',
  ],
  // Default provider for instrumenting code for coverage is Babel. V8 is still
  // experimental, but uses uses V8's builtin code coverage. Prefers recent Node versions.
  //coverageProvider: 'v8',
  // Configure minimum threshold enforcement for coverage results percentage coverage
  // for branches, functions, and lines, and number of uncovered statements.
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
  // Make calling deprecated APIs throw helpful error messages.
  errorOnDeprecated: true,
  testPathIgnorePatterns: ['/.cache/', '/build/', '/node_modules/', '/public/'],
  // Config Jest so that all js/ts or jsx/tsx files will be transformed using a `jest-preprocess.js` file in the project root.
  transform: { '.(ts|tsx)': 'ts-jest' },
}

/**
 * Pull path mappings that allow non-relative imports within the project from
 * TypeScript config so they can be spread into Jest moduleNameMapper config option
 */
export function mappings(cwd: string): Record<string, string> {
  const tsconfigPath = resolveSync(cwd)

  if (!tsconfigPath) throw new Error('No tsconfig.json file found')

  try {
    return tsconfigPath ? getJestMappersFromTSConfig(tsconfigPath) : {}
  } catch (err) {
    const missingPathsKeyErrorText =
      'paths field not found in tsconfig compiler options'
    if (err.message != missingPathsKeyErrorText) throw err
    return {}
  }
}

export default sharedConfig
