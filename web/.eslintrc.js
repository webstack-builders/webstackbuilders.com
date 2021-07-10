// Over ride of default Gatsby ESLint configuration
// Default config handles GraphQL tagged literal linting, but
// you have to provide the app's schema for it to work:
// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby/src/utils/eslint-config.ts
module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: '@webstackbuilders/eslint-config-company-website',
  root: true,
}
