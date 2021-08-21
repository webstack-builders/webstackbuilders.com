/*
 * Usage:
 *
 * import useSiteMetadata from 'hooks/use-site-metadata'
 *
 * const MyComponent = (props) => {
 *   const { title, social } = useSiteMetadata()
 *   ...
 */
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
            twitter
            github
          }
        }
      }
    }
  `)
  return data.site.siteMetadata
}
