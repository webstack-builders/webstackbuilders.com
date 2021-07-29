import clientConfig from 'client-config'
import { GatsbyImage } from 'gatsby-plugin-image'
import { getGatsbyImageData } from 'gatsby-source-sanity'
import React from 'react'

export const Figure = ({ node }) => {
  if (!node || !node.asset || !node.asset._id) {
    return null
  }
  const gatsbyImageData = getGatsbyImageData(
    node,
    { maxWidth: 675 },
    clientConfig.sanity
  )
  return (
    <figure>
      <GatsbyImage image={gatsbyImageData} alt={node.alt} />
      <figcaption>{node.caption}</figcaption>
    </figure>
  )
}
