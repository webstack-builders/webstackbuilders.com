"use strict";
/*
 * Usage:
 *
 * import useSiteMetadata from 'hooks/use-site-metadata'
 *
 * const MyComponent = (props) => {
 *   const { title, social } = useSiteMetadata()
 *   ...
 */
/*
import { graphql, useStaticQuery } from 'gatsby'

export default function useSiteMetadata() {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
          keywords
          siteUrl
          author {
            name
            url
            email
          }
          social {
            name
            url
          }
        }
      }
    }
  `)

  return data.site.siteMetadata
}
*/
//# sourceMappingURL=use-site-metadata.js.map