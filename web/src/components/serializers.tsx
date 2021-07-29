import { Figure } from 'components/Figure'
import React from 'react'

const serializers = {
  types: {
    /* eslint-disable-next-line react/display-name */
    authorReference: ({ node }) => <span>{node.author.name}</span>,
    mainImage: Figure,
  },
}

export default serializers
