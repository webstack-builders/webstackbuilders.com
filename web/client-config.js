/**
 * Sanity client variables from environmental file
 *
 * Used in client-side React components fetching image data from Sanity CMS
 */
module.exports = {
  sanity: {
    dataset: process.env.SANITY_DATASET,
    projectId: process.env.SANITY_PROJECT_ID,
    // staging dataset for use in development is private
    ...(process.env.NODE_ENV === 'development' && {
      token: process.env.SANITY_TOKEN,
    }),
  },
}
