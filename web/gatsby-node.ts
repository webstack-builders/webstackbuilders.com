/**
 * Implement Gatsby's Node APIs in this file.
 *
 * This file is web/src/gatsby-node.ts and is compiled to web/gatsby-node.js, make changes in this file
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
import Dotenv from 'dotenv-webpack'
import { GatsbyNode } from 'gatsby'

import createBlogPages from './src/gatsby/create-blog-pages'

/**
 * Central call site for site createPages lifecycle hook
 */
export const createPages: GatsbyNode['createPages'] = async (gatsbyNode) => {
  await createBlogPages(gatsbyNode)
}

/**
 * Modify default Gatsby Webpack config:
 *
 * 1. Use dotenv-webpack to allow env vars to be passed into the build bundle
 * 2. Allow absolute imports, e.g. `import Header from 'components/header'` instead of `import Header from '../../components/header'`
 */
export const onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [new Dotenv()],
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  })
}
