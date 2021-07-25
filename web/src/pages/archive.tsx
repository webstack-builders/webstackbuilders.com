import { graphql } from 'gatsby'
import React from 'react'

import BlogPostPreviewGrid from '../components/blog-post-preview-grid'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import { responsiveTitle1 } from '../components/typography.module.css'
import Layout from '../containers/layout'
import { mapEdgesToNodes } from '../lib/helpers'

export const query = graphql`
  query ArchivePageQuery {
    posts: allSanityPost(
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          id
          publishedAt
          mainImage {
            ...SanityImage
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`

const ArchivePage = (props) => {
  const { data, errors } = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const postNodes = data && data.posts && mapEdgesToNodes(data.posts)

  return (
    <Layout>
      {/* eslint-disable react/jsx-pascal-case */}
      <SEO title="Archive" />
      {/* eslint-enable react/jsx-pascal-case */}
      <Container>
        <h1 className={responsiveTitle1}>Archive</h1>
        {postNodes && postNodes.length > 0 && (
          <BlogPostPreviewGrid nodes={postNodes} />
        )}
      </Container>
    </Layout>
  )
}

export default ArchivePage
