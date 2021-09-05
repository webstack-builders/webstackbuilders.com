# Testing

This project uses Jest for testing. For transforming TypeScript to input that Jest can use, the project uses `ts-node`, a TypeScript execution and REPL for NodeJS, with source map support, `ts-jest `, a Jest transformer with source map support that lets you use Jest to test projects written in TypeScript, Reacting Testing Library, React Test Renderer, and Identity Proxy for Objects.

`npm i --save-dev jest ts-node ts-jest @types/jest`

## React Testing Library

The [`React Testing Library`](https://testing-library.com/docs/react-testing-library/intro/) is a very lightweight solution for testing React components. It provides light utility functions on top of `react-dom` and `react-dom/test-utils`, in a way that encourages better testing practices.  RTL works with instances of rendered React components so that tests will work with actual DOM nodes. The utilities this library provides facilitate querying the DOM in the same way the user would. Finding form elements by their label text (just like a user would), finding links and buttons from their text (like a user would). It also exposes a recommended way to find elements by a `data-testid` as an "escape hatch" for elements where the text content and label do not make sense or is not practical.

The [`@testing-library/jest-dom`](https://github.com/testing-library/jest-dom) library provides a set of custom jest matchers that you can use to extend jest. These will make your tests more declarative, clear to read and to maintain.

`npm install --save-dev @testing-library/react @testing-library/jest-dom` 

This example test uses `chai` and `chai-dom` (@TODO: Refactor to use React Test Renderer)

```javascript
import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import chai from "chai"
// chai-dom is an extension to the chai assertion library that provides a set of
// assertions when working with the DOM (specifically HTMLElement and NodeList)
import chaiDom from "chai-dom"

chai.use(chaiDom)
const { expect } = chai

describe("Test Suite", () => {
  beforeEach(() => {
    // TODO: Uncomment this if you're using `jest.spyOn()` to restore mocks between tests
    // jest.restoreAllMocks()
  })

  it("click on a button", () => {
    const { getByText } = render(<button>Hello World</button>)

    // `getByText` comes from `testing-library/react` and will find an element,
    // or error if the element doesn't exist.  See the queries documentation
    // for info about other query types:
    // https://testing-library.com/docs/dom-testing-library/api-queries
    const button = getByText("Hello World")

    // `userEvent` is a library for interacting with elements.  This will
    // automatically call `React.act()` for you - https://reactjs.org/docs/test-utils.html#act.
    userEvent.click(button)
  })
})
```

## React Test Renderer

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

## Mocks

If the module you are mocking is a Node module (e.g.: `lodash`), the mock should be placed in the `__mocks__` directory adjacent to `node_modules` and it will be **automatically** mocked. There's no need to explicitly call `jest.mock('module_name')`. To mock a scoped module called `@scope/project-name`, create a file at `__mocks__/@scope/project-name.js`, creating the `@scope/` directory accordingly.

## Jest Global Configuration Options

package.json

```javascript
{
  "scripts": {   
    "test": "set CI=true && react-scripts test",
    "test:watch": "react-scripts test",
    "test:coverage": "set CI=true && react-scripts test --coverage"
  }
}
```

Global Jest Configuration (`<root>/jest.config.ts`)

```javascript
const sharedConfig = {
  // Directory where Jest should store its cached dependency information
  cacheDirectory: '.cache',
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
  ],
  // Directory where Jest should output its coverage files
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

export default sharedConfig
```

Project configuration in `web` / `studio` / `packages` directories

```javascript
import type {Config} from '@jest/types'
import sharedConfig from '../jest.config.ts'

export default async (): Promise<Config.InitialOptions> =>  {
  return {
    ...sharedConfig,
    'rootDir': './',
  }
}
```


`web/jest.config.js`

```javascript
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
```

`studio/jest.config.js`

```javascript
const tsconfig = require('./tsconfig.json')
const moduleNameMapper = require('tsconfig-paths-jest')(tsconfig)

module.exports = {
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

## Istanbul Code Coverage Setup



## Performance

All tests run in NodeJS, where this is no browser.  By default, Jest will initialize a `jsdom` environment for you, which gives you a `window` and a `document` and will let you render nodes to a virtual screen.  But, if you’re  writing a test for a module that doesn’t need to interact with the DOM,  you can speed up a test by using the “node” jest environment which will  skip all of that:

```javascript
/**
 * @jest-environment node
 */
```

## Sample Test

```javascript
// example: app.spec.js
import app from './app'
test('the app is for realz', () => {
  expect(app.doesSomething()).toEqual('realsies')
})
```

## Notes

- `*.spec.js` files are automatically picked up and run by the test runner.
- In `jest.config.js`, `<rootDir>` is a special token that Jest understands to be the directory containing your `package.json`. 

- If there are local dependencies that need transformed by Jest, override the default `node_modules` ignore pattern with the Jest config option `transformIgnorePatterns`. This is an array of regex strings that describe what should be skipped by the transform. The regex containing `?!.*my-project-b`.* is a regex negative look ahead. Together, the pattern means "ignore transforming anything in `node_modules` that doesn’t include `my-project-b` in the file path".

```javascript
  "transformIgnorePatterns": [
    "<rootDir>.*(node_modules)(?!.*my-project-b.*).*$"
  ]
```
