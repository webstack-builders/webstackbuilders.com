// Over ride of default Gatsby ESLint configuration
// Default config handles GraphQL tagged literal linting, but
// you have to provide the app's schema for it to work:
// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby/src/utils/eslint-config.ts
const path = require('path')

module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: '@webstackbuilders/eslint-config-company-website',
  root: true,
  plugins: ['graphql'],
  rules: {
    'graphql/template-strings': [
      'error',
      {
        env: 'relay',
        tagName: 'graphql',
        schemaJsonFilepath: path.resolve(
          __dirname,
          '__generated__gatsby-introspection.json'
        ),
      },
    ],
  },
}
