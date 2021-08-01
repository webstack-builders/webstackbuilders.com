/**
 * Default file called by `gatsby-plugin-layout` to provide a layout
 * component that doesn't unmount between page transitions on routing
 */
import React from 'react'

const Layout: React.FC<Props> = ({ children }) => {
  return <>{children}</>
}

export default Layout
