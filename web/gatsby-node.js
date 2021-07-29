/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const Dotenv = require('dotenv-webpack')

const createBlogPages = require('./src/gatsby/gatsby-node/create-blog-pages')

/**
 * Central call site for site createPages lifecycle hook
 */
exports.createPages = async (gatsbyNode) => {
  await createBlogPages(gatsbyNode)
}

/**
 * Modify default Gatsby Webpack config:
 *
 * 1. Use dotenv-webpack to allow env vars to be passed into the build bundle
 */
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [new Dotenv()],
  })
}
