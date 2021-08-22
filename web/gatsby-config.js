'use strict'
/**
 * Use TypeScript gatsby-config file. After config loads, Gatsby will use
 * TypeScript for the other gatsby-* files. Also load env vars so they're
 * available everywhere.
 *
 * Source-map-support mimics node's stack trace making debugging easier
 * ts-node register helps importing and compiling TypeScript modules into JS
 *
 * @TODO: If repo is converted to a theme plugin, the export can be a function that takes an
 * options object from the child starter repo option object passed in its `gatsby-config.js`.
 * See example options config for `gatsby-plugin-theme-ui`:
 *
 * https://github.com/gatsbyjs/themes/blob/master/packages/gatsby-theme-blog/gatsby-config.js
 */
const path = require('path')

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
})

require('source-map-support').install()

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
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/webstackbuilders`,
      },
      {
        name: `github`,
        url: `https://github.com/webstackbuilders`,
      },
    ],
  },
  plugins: [
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
        jsxPragma: 'jsx', // defaults to "React"
        allExtensions: true, // defaults to false, required if isTSX set to true
      },
    },
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        // @TODO: May need to refactor to use require.resolve when project converted to a template plugin
        // https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/converting-a-starter/
        src: path.join(__dirname, 'src'),
        generated: path.join(__dirname, '__generated__'),
        types: path.join(__dirname, 'src/@types'),
        api: path.join(__dirname, 'src/api'),
        components: path.join(__dirname, 'src/components'),
        containers: path.join(__dirname, 'src/containers'),
        gatsby: path.join(__dirname, 'src/gatsby'),
        hooks: path.join(__dirname, 'src/hooks'),
        layouts: path.join(__dirname, 'src/layouts'),
        lib: path.join(__dirname, 'src/lib'),
        pages: path.join(__dirname, 'src/pages'),
        styles: path.join(__dirname, 'src/styles'),
        templates: path.join(__dirname, 'src/templates'),
      },
    },
    {
      resolve: 'gatsby-plugin-theme-ui',
      options: {
        preset: '@webstackbuilders/theme-preset-website',
      },
    },
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaults: {
          formats: ['auto', 'webp'],
          placeholder: 'dominantColor',
          quality: 50,
          breakpoints: [750, 1080, 1366, 1920],
          backgroundColor: 'transparent',
          tracedSVGOptions: {},
          blurredOptions: {},
          jpgOptions: {},
          pngOptions: {},
          webpOptions: {},
          avifOptions: {},
        },
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-image',
    {
      // add a rel=canonical link element to the head of every HTML page
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://www.example.com',
        stripQueryString: true,
      },
    },
    // Use src/layouts/index.js as a wrapper component that doesn't unmount on client route transitions
    'gatsby-plugin-layout',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-netlify',
    'gatsby-plugin-eslint',
    'gatsby-plugin-postcss',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Webstack Builders`,
        short_name: `webstackbuilders.com`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-typegen',
      options: {
        outputPath: '__generated__/gatsby-types.d.ts',
        emitSchema: {
          '__generated__/gatsby-schema.graphql': true,
          '__generated__/gatsby-introspection.json': true,
        },
        emitPluginDocuments: {
          '__generated__/gatsby-plugin-documents.graphql': true,
        },
      },
    },
  ],
}
