import { isFuture, format } from 'date-fns'

import BlogPost from '../templates/blog-post'

interface IPostEdge {
  node: {
    id: string
    publishedAt: string
    slug: {
      current: string
    }
  }
}

interface IPostQueryResult {
  allSanityPost: {
    edges: IPostEdge[]
  }
}

/**
 * Create Pages for Blog Posts
 */
export default async function createBlogPostPages(graphql, actions) {
  const { createPage } = actions

  /**
   * Pass the query structure generic for complete type-check coverage
   */
  const result = await graphql<IPostQueryResult>(`
    {
      allSanityPost(
        filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
      ) {
        edges {
          node {
            id
            publishedAt
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  if (!result.data) {
    throw new Error('ERROR: Could not fetch posts on build')
  }

  // Create blog posts pages.
  const posts = (result.data.allSanityPost || {}).edges || []

  posts
    .filter((edge: IPostEdge) => !isFuture(new Date(edge.node.publishedAt)))
    .forEach((edge: IPostEdge) => {
      const { id, slug = {}, publishedAt } = edge.node
      const dateSegment = format(new Date(publishedAt), 'yyyy/MM')
      const path = `/blog/${dateSegment}/${slug.current}/`

      createPage({
        path,
        component: BlogPost,
        context: { id },
      })
    })
}
