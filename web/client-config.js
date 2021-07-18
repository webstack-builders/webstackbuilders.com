/**
 * Sanity environmental variables
 *
 * Used in gatsby-config, and components fetching image data from Sanity CMS
 */
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  sanity: {
    dataset: process.env.SANITY_DATASET,
    projectId: process.env.SANITY_PROJECT_ID,
    token: process.env.SANITY_TOKEN,
  },
}
