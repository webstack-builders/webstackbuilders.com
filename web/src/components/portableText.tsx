import BasePortableText from '@sanity/block-content-to-react'
import clientConfig from 'client-config'
import serializers from 'components/serializers'
import React from 'react'

const PortableText = ({ blocks }) => (
  <BasePortableText
    blocks={blocks}
    serializers={serializers}
    {...clientConfig.sanity}
  />
)

export default PortableText
