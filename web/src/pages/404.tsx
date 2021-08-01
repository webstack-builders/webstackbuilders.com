import { PageProps } from 'gatsby'
import React from 'react'

import Layout from 'components/layout'
import SEO from 'components/seo'

const NotFoundPage: React.FC<PageProps> = () => (
  <Layout>
    {/* eslint-disable react/jsx-pascal-case */}
    <SEO title="404: Not found" />
    {/* eslint-enable react/jsx-pascal-case */}
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
)

export default NotFoundPage
