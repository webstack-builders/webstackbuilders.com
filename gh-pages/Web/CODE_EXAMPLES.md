# Gatsby Code Samples

## `GatsbyImage`

You can then use the `GatsbyImage` component to display the image on the page. The `getImage()` function is an optional helper to make your code easier to read. It takes a `File` and returns `file.childImageSharp.gatsbyImageData`, which can be passed to the `GatsbyImage` component.

```jsx
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

function BlogPost({ data }) {
 const image = getImage(data.blogPost.avatar)
 return (
   <section>
     <h2>{data.blogPost.title}</h2>
     <GatsbyImage image={image} alt={data.blogPost.author} />
     <p>{data.blogPost.body}</p>
   </section>
 )
}

export const pageQuery = graphql`
 query {
   blogPost(id: { eq: $Id }) {
     title
     body
     author
     avatar {
       childImageSharp {
         gatsbyImageData(
           width: 200
           placeholder: BLURRED
           formats: [AUTO, WEBP, AVIF]
         )
       }
     }
   }
 }
`
```

Above from https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/creating-a-source-plugin/



## Client-Only Routes

Client-only routes will exist on the client only and will not correspond to `index.html` files in an app’s built assets in the `/public` directory.

A `<PrivateRoute />` component using authentication and a router would look something like this (taken from the [Authentication Tutorial](https://www.gatsbyjs.com/tutorial/authentication-tutorial/#controlling-private-routes), which implements this behavior):

`src/components/PrivateRoute.js`

```jsx
import React from "react"
import { navigate } from "gatsby"
import { isLoggedIn } from "../services/auth"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (!isLoggedIn() && location.pathname !== `/app/login`) {
    navigate("/app/login")
    return null
  }

  return <Component {...rest} />
}

export default PrivateRoute
```

And to handle client-only routes in Gatsby:

`src/pages/app/[...].js`

```jsx
import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/Layout"
import Profile from "../components/Profile"
import Details from "../components/Details"
import Login from "../components/Login"
import Default from "../components/Default"
import PrivateRoute from "../components/PrivateRoute"

const App = () => {
  return (
    <Layout>
      <Router basepath="/app">
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/details" component={Details} />
        <Login path="/login" />
        <Default path="/" />
      </Router>
    </Layout>
  )
}

export default App
```

Netlify needs some help in order to serve client-only routes correctly. Most Gatsby pages have a corresponding  html file that the server responds with when a user visits the page e.g. visiting `/blog/my-blog-post/` makes the server respond with `/blog/my-blog-post/index.html`. But client-only routes like `/app/why-gatsby-is-awesome/` don’t have a corresponding html file. The server needs to be configured to know to serve instead `/app/index.html`.

Redirect rules are automatically added for client only paths when using `gatsby-plugin-netlify`

