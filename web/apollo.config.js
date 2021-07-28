// For VS Code Apollo GraphQL extension
module.exports = {
  client: {
    name: '@webstackbuilders/eslint-config-company-website',
    tagName: 'graphql',
    includes: [
      './src/**/*.{ts,tsx}',
      './__generated__/gatsby-plugin-documents.graphql',
    ],
    service: {
      name: 'GatsbyJS',
      localSchemaFile: './__generated__/gatsby-schema.graphql',
    },
  },
}
