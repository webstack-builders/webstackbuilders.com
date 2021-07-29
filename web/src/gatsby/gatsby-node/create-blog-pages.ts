import path from 'path'

import { isFuture, format } from 'date-fns'
import { CreatePagesArgs } from 'gatsby'

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
export default async function createBlogPages({
  graphql,
  actions,
  reporter,
}: CreatePagesArgs) {
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
    reporter.panicOnBuild(
      `Error while running GraphQL query in createBlogPages.`
    )
    return
  }

  if (!result.data) {
    reporter.panicOnBuild(
      'Error, could not fetch posts on build in createBlogPages'
    )
    return
  }

  // Create blog posts pages.
  const posts = (result.data.allSanityPost || {}).edges || []
  // const blogPosts = result?.data?.posts.nodes

  posts
    .filter((edge: IPostEdge) => !isFuture(new Date(edge.node.publishedAt)))
    .forEach((edge: IPostEdge) => {
      const { id, slug = { current: '' }, publishedAt } = edge.node
      const dateSegment = format(new Date(publishedAt), 'yyyy/MM')
      const blogPostTemplate = path.resolve('src/templates/blog-post.tsx')

      createPage({
        path: `/blog/${dateSegment}/${slug.current}/`,
        component: blogPostTemplate,
        context: { id },
      })
    })
}
