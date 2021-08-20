// Over ride of default Gatsby ESLint configuration
// Default config handles GraphQL tagged literal linting, but
// you have to provide the app's schema for it to work:
// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby/src/utils/eslint-config.ts

const path = require('path') // eslint-disable-line @typescript-eslint/no-var-requires

const level = process.env.NODE_ENV === 'production' ? 'error' : 'warn'

module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: '@webstackbuilders/eslint-config-company-website',
  root: true,
  plugins: ['graphql'],
  rules: {
    'graphql/template-strings': [
      level,
      {
        env: 'relay',
        tagName: 'graphql',
        schemaJsonFilepath: path.resolve(
          __dirname,
          '__generated__/gatsby-introspection.json'
        ),
      },
    ],
  },
  settings: {
    'import/resolver': {
      // config for typescript import/resolver is here instead of in packages/eslint-config-company-website is so that
      // the local tsconfig.json file is used, and can include a path directive for webpack aliases as absolute imports
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/some-package`
        project: path.resolve(__dirname, './tsconfig.json'),
      },
    },
  },
}
