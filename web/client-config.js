module.exports = {
  sanity: {
    dataset: process.env.GATSBY_SANITY_DATASET || 'production',
    projectId: process.env.GATSBY_SANITY_PROJECT_ID || 'h9421zzw',
    token: process.env.SANITY_READ_TOKEN_h9421zzw,
  },
  resolve: `gatsby-plugin-typescript`,
  options: {
    isTSX: true, // defaults to false
    jsxPragma: `jsx`, // defaults to "React"
    allExtensions: true, // defaults to false, required if isTSX set to true
  },
}
