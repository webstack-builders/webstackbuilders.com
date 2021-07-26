'use strict'
/**
 * Use TypeScript gatsby-config file. After config loads, Gatsby will use
 * TypeScript for the other gatsby-* files. Also load env vars so they're
 * available everywhere.
 *
 * Source-map-support mimics node's stack trace making debugging easier
 * ts-node register helps importing and compiling TypeScript modules into JS
 */

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
})
require('source-map-support').install()
require('ts-node').register()

module.exports = require('./gatsby-config.ts')
