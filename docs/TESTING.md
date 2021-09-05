# Testing



## Packages Used for Testing

`npm i --save-dev jest @types/jest`

ts-jest

ts-node

## Usage of React Test Renderer

React Test Renderer provides an experimental React renderer that can  be used to render React components to pure JavaScript objects, without  depending on the DOM or a native mobile environment. This package makes it easy to grab a snapshot of the  "DOM tree" rendered by a React DOM or React Native component without using a browser or` jsdom`.

`npm i --save-dev react-test-renderer @types/react-test-renderer`

```javascript
import ReactTestRenderer from 'react-test-renderer'

const renderer = ReactTestRenderer.create(
  <Link page="https://www.facebook.com/">Facebook</Link>
)

console.log(renderer.toJSON())
// { type: 'a',
//   props: { href: 'https://www.facebook.com/' },
//   children: [ 'Facebook' ] }
```

## Identity Proxy for Objects

An identity object using ES6 proxies. Useful for testing trivial  webpack imports. For example, if you `import styles from 'styles.css'`, you can then configure Jest to import `identity-obj-proxy` for `*.css`. Then stylings such as `styles.container`  will resolve to `container` instead of throwing an exception.

`npm i --save-dev identity-obj-proxy`

```javascript
import idObj from 'identity-obj-proxy'
console.log(idObj.foo) // 'foo'
console.log(idObj.bar) // 'bar'
console.log(idObj[1]) // '1'
```

## Jest Global Configuration Options

```javascript
// package.json
{
  "scripts": {
    "test": "jest"
  }
}

// sample/jest.config.js
module.exports = {
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  // This is to set up a directory for Istanbul code coverage reporting output:
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  setupFilesAfterEnv: ['<rootDir>packages/setupTests.ts'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '(/__tests__/.*|(\\.|/)(test|spec))\\.d\.ts$'
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
}

// web/jest.config.js
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
/*
Tells Jest how to handle imports, especially for mocking static file imports which Jest can’t handle. In webpack projects, we often allow importing things like css files or jpg files, and let a webpack loader plugin take care of loading these resources. In a unit test, though, we're running in node.js which doesn't know how to import these, so this tells jest what to do for these.
*/
  moduleNameMapper: {
    // Mock stylesheets using the `identity-obj-proxy` package
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
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

// studio/jest.config.js
const tsconfig = require('./tsconfig.json')
const moduleNameMapper = require('tsconfig-paths-jest')(tsconfig)

module.exports = {
  coveragePathIgnorePatterns: ['/node_modules/', '/test/'],
  collectCoverageFrom: ['src/*.{js,ts}'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'css'],
  moduleNameMapper: {
    ...moduleNameMapper,
    '\\.(css|less|sass|scss)$': '<rootDir>/test/__mocks__/styleMock.js',
  },
  testEnvironment: 'jsdom',
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
}
      

```

## Notes

`*.spec.js` files are automatically picked up and run by the test runner.

To be able to also babel-transform the files that are local dependencies, allowing them to be tested via jest as well, we’ll take advantage of a config option called transformIgnorePatterns. This is an array of regex strings that describe what should be skipped by the transform. This will override the default node_modules ignore pattern. It would be a lot simpler to be able to whitelist local packages we want to transform, but instead jest asks us to tell it what not to ignore. Something like this in package.json will do the job:

```javascript
"jest": {
  "transformIgnorePatterns": [
    "<rootDir>.*(node_modules)(?!.*my-project-b.*).*$"
  ]
}
```

There are a couple things of note here. <rootDir> is a special token that jest understands to be the directory containing your `package.json`. The fancy regex bit containing `?!.*my-project-b`.* is called a regex negative look ahead. Together, the pattern means “ignore transforming anything in `node_modules` that doesn’t include `my-project-b` in the file path.” This is what we want, but this is a gross regex.

## Sample Test

```javascript
// example: app.spec.js
import app from './app'
test('the app is for realz', () => {
  expect(app.doesSomething()).toEqual('realsies')
})
```
