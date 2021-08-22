/*
 * Assist code completion for VS Code Apollo GraphQL extension
 */
module.exports = {
  client: {
    name: '@webstackbuilders/eslint-config-company-website',
    tagName: 'graphql',
    includes: [
      './src/**/*.{ts,tsx}',
      './__generated__/gatsby-plugin-documents.graphql',
    ],
    service: {
      name: 'webstackbuilders-website-graphql-schema',
      localSchemaFile: __dirname + '/__generated__/gatsby-schema.graphql',
    },
  },
}
