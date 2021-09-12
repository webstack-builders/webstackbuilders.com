/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const Dotenv = require('dotenv-webpack')
const createBlogPages = require('./src/gatsby/gatsby-node/create-blog-pages')

/** @typedef {import('gatsby').CreatePagesArgs} CreatePagesArgs */

/**
 * Central call site for site createPages lifecycle hook
 *
 * @param {CreatePagesArgs} createPagesArgs
 * @return {unknown}
 */
export async function createPages(createPagesArgs) {
  await createBlogPages(createPagesArgs)
}

/** @typedef {import('gatsby').CreateWebpackConfigArgs} CreateWebpackConfigArgs */

/**
 * Modify default Gatsby Webpack config:
 *
 * - use dotenv-webpack to allow env vars to be passed into the build bundle
 *
 * @param {CreateWebpackConfigArgs} createPagesArgs
 * @return {Promise<void>}
 */
export function onCreateWebpackConfig(createPagesArgs) {
  const { actions } = createPagesArgs
  actions.setWebpackConfig({
    // devtool controls if and how source maps are generated. eval-source-map yields the best quality
    // SourceMaps for development. Set for use by debugger for Chrome , set in `.vscode/launch.json`
    devtool: 'eval-source-map',
    // loads environment variables from an .env file into process.env
    plugins: [new Dotenv()],
  })
}
