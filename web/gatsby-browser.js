/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import '@reach/skip-nav/styles.css'

/** @typedef {{ location: object, prevLocation: object }} LocationObject */

/**
 * @param {LocationObject} locationObject
 * @return {undefined}
 */
function skipLinkHandler(locationObject) {
  const prevLocation = locationObject?.prevLocation
  if (prevLocation !== null) {
    const skipLink = document.querySelector(`[data-reach-skip-link]`)

    if (skipLink) {
      skipLink.focus()
    }
  }
}

/**
 * @param {LocationObject} locationObject
 * @return {undefined}
 */
export function onRouteUpdate(locationObject) {
  skipLinkHandler(locationObject)
}
