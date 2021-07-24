require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
})

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  siteMetadata: {
    title: 'webstack-builders-company-website',
    description: 'The webstackbuilders.com company website.',
    keywords:
      'gatsbyjs, gatsby, javascript, sanity, themeui, typescript, graphql, apollo',
    siteUrl: 'https://www.webstackbuilders.com',
    author: {
      name: 'Webstack Builders <info@webstackbuilders.com>',
      url: 'https://www.webstackbuilders.com/contact',
      email: 'info@webstackbuilders.com',
    },
  },
  plugins: [
    {
      // add a rel=canonical link element to the head of every HTML page
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://www.example.com`,
        stripQueryString: true,
      },
    },
    'gatsby-plugin-eslint',
    'gatsby-plugin-image',
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-theme-ui`,
      options: {
        preset: '@webstackbuilders/preset-website',
      },
    },
    {
      resolve: 'gatsby-source-sanity',
      options: {
        dataset: process.env.SANITY_DATASET,
        projectId: process.env.SANITY_PROJECT_ID,
        token: process.env.SANITY_TOKEN,
        watchMode: !isProd,
        overlayDrafts: !isProd,
      },
    },
    {
      // automatically included in Gatsby, only reason to explicitly use is to configure its options.
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false, required if isTSX set to true
      },
    },
  ],
}
