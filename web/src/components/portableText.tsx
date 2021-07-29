import BasePortableText from '@sanity/block-content-to-react'
import serializers from 'components/serializers'
import clientConfig from 'gatsby/client-config'
import React from 'react'

const PortableText = ({ blocks }) => (
  <BasePortableText
    blocks={blocks}
    serializers={serializers}
    {...clientConfig.sanity}
  />
)

export default PortableText
