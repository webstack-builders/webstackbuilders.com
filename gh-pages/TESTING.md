Jest requires the TypeScript packages to be built before running tests even though babel will be working for the test files themselves. I resolved this by implementing a pretest script that runs the build before tests are run, and a convenience test:only script for when developers are only writing tests and not updating component code.

Jest 24 and TypeScript only worked for me when naming it babel.config.js and not .babelrc or .babrlrc.js:

```javascript
// package.json
{
  "scripts": {
    "test": "jest"
  }
}

// babel.config.js
module.exports = {
  presets: [
    '@babel/preset-react',
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry'
      }
    ],
  ]
}

// jest.config.js
module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  testPathIgnorePatterns: [
    '/node_modules/',
    '(/__tests__/.*|(\\.|/)(test|spec))\\.d\.ts$'
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: ['<rootDir>packages/setupTests.ts'],
  // ...
}

// example: app.spec.js
import app from './app'
test('the app is for realz', () => {
  expect(app.doesSomething()).toEqual('realsies')
})
```

`*.spec.js` files are automatically picked up and run by the test runner.

To be able to also babel-transform the files that are local dependencies, allowing them to be tested via jest as well, we’ll take advantage of a config option called transformIgnorePatterns. This is an array of regex strings that describe what should be skipped by the transform. This will override the default node_modules ignore pattern. It would be a lot simpler to be able to whitelist local packages we want to transform, but instead jest asks us to tell it what not to ignore. Something like this in package.json will do the job:

```javascript
"jest": {
  "transformIgnorePatterns": [
    "<rootDir>.*(node_modules)(?!.*my-project-b.*).*$"
  ]
}
```

There are a couple things of note here. <rootDir> is a special token that jest understands to be the directory containing your package.json. The fancy regex bit containing ?!.*my-project-b.* is called a regex negative look ahead. Together, the pattern means “ignore transforming anything in node_modules that doesn’t include my-project-b in the file path.” This is what we want, but this is a gross regex.

