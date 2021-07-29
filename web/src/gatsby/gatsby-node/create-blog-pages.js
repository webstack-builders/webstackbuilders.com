const path = require('path')

const format = require('date-fns').format
const isFuture = require('date-fns').isFuture

const blogPostTemplatePath = path.resolve('src/templates/blog-post.tsx')

/**
 * Create Pages for Blog Posts
 */
const createBlogPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
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
    .filter((edge) => !isFuture(new Date(edge.node.publishedAt)))
    .forEach((edge) => {
      const { id, slug = { current: '' }, publishedAt } = edge.node
      const dateSegment = format(new Date(publishedAt), 'yyyy/MM')

      createPage({
        path: `/blog/${dateSegment}/${slug.current}/`,
        component: blogPostTemplatePath,
        context: { id },
      })
    })
}

module.exports = createBlogPages
