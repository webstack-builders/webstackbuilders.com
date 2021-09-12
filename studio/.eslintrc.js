module.exports = {
  parser: '@babel/eslint-parser',
  extends: ['@webstackbuilders/eslint-config-company-website'],
  ignorePatterns: ['**/node_modules/**'],
  root: true,
  rules: {
    'import/no-unresolved': [
      2,
      {
        ignore: ['^(all|part):'],
      },
    ],
  },
}
