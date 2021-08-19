//import type { Query, SanitySiteSettings } from 'generated/gatsby-types'

import BlogPostPreviewList from 'components/blog-post-preview-list'
import Container from 'components/container'
import GraphQLErrorList from 'components/graphql-error-list'
import SEO from 'components/seo'
import Layout from 'containers/layout'
import { graphql, PageProps } from 'gatsby'

import {
  filterOutDocsPublishedInTheFuture,
  filterOutDocsWithoutSlugs,
  mapEdgesToNodes,
} from 'lib/helpers'
import React from 'react'

// SanityMainImage
// Query_sanitySiteSettingsArgs, sanitySiteSettings
// Query_allSanityPostArgs, Query.allSanityPost
export const query = graphql`
  fragment SanityImage on SanityMainImage {
    crop {
      _key
      _type
      top
      bottom
      left
      right
    }
    hotspot {
      _key
      _type
      x
      y
      height
      width
    }
    asset {
      _id
    }
  }

  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    posts: allSanityPost(
      limit: 6
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

interface IndexPageProps extends PageProps {
  errors?: any
  data: {
    site: {
      siteMetadata: {
        siteName: string
      }
    }
  }
}

const IndexPage = (props: IndexPageProps) => {
  const { data, errors } = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const site = (data || {}).site
  const postNodes = (data || {}).posts
    ? mapEdgesToNodes(data.posts)
        .filter(filterOutDocsWithoutSlugs)
        .filter(filterOutDocsPublishedInTheFuture)
    : []

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  return (
    <Layout>
      {/* eslint-disable react/jsx-pascal-case */}
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
      />
      {/* eslint-enable react/jsx-pascal-case */}
      <Container>
        <h1 hidden>Welcome to {site.title}</h1>
        {postNodes && (
          <BlogPostPreviewList
            title="Latest blog posts"
            nodes={postNodes}
            browseMoreHref="/archive/"
          />
        )}
      </Container>
    </Layout>
  )
}

export default IndexPage
