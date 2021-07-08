// Over ride of default Gatsby ESLint configuration
// Default config handles GraphQL tagged literal linting, but
// you have to provide the app's schema for it to work:
// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby/src/utils/eslint-config.ts
module.exports = {
  extends: '@webstackbuilders/eslint-config-company-website',
  overrides: [
    // Browser Context
    {
      files: ['src/**'],
      globals: {
        __BASE_PATH__: true,
        __PATH_PREFIX__: true,
        graphql: true,
        // Use `global` instead of window since window is undefined in NodeJS
        window: 'off',
      },
    },
  ],
  parserOptions: {
    babelOptions: {
      presets: [require.resolve('babel-preset-gatsby')],
    },
  },
  root: true,
  rules: {
    // Custom ESLint rules required by Gatsby
    'no-anonymous-exports-page-templates': 'warn',
    'limited-exports-page-templates': 'warn',
  },
}
