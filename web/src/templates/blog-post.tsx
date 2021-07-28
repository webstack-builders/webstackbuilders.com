import BlogPost from 'components/blog-post'
import Container from 'components/container'
import GraphQLErrorList from 'components/graphql-error-list'
import SEO from 'components/seo'
import Layout from 'containers/layout'
import { graphql, PageProps } from 'gatsby'
import { toPlainText } from 'lib/helpers'
import React from 'react'

export const query = graphql`
  query BlogPostTemplateQuery($id: String!) {
    post: sanityPost(id: { eq: $id }) {
      id
      publishedAt
      categories {
        _id
        title
      }
      mainImage {
        ...SanityImage
        alt
      }
      title
      slug {
        current
      }
      _rawExcerpt(resolveReferences: { maxDepth: 5 })
      _rawBody(resolveReferences: { maxDepth: 5 })
      authors {
        _key
        author {
          image {
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
          name
        }
      }
    }
  }
`

const BlogPostTemplate: React.FC = (props: PageProps) => {
  const { data, errors } = props
  const post = data && data.post
  return (
    <Layout>
      {/* eslint-disable react/jsx-pascal-case */}
      {errors && <SEO title="GraphQL Error" />}
      {post && (
        <SEO
          title={post.title || 'Untitled'}
          description={toPlainText(post._rawExcerpt)}
          image={post.mainImage}
        />
      )}
      {/* eslint-enable react/jsx-pascal-case */}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}

      {post && <BlogPost {...post} />}
    </Layout>
  )
}

export default BlogPostTemplate
