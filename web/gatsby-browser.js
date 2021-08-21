/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import '@reach/skip-nav/styles.css'

export const onRouteUpdate = ({ prevLocation }) => {
  if (prevLocation !== null) {
    const skipLink = document.querySelector(`[data-reach-skip-link]`)

    if (skipLink) {
      skipLink.focus()
    }
  }
}
