import React from 'react'

import 'modern-normalize'
import 'styles/normalize'

interface HtmlProps {
  htmlAttributes?: React.HTMLAttributes
  headComponents?: React.ReactElement[]
  bodyAttributes?: React.AllHTMLAttributes
  preBodyComponents?: React.ReactElement[]
  body: string
  postBodyComponents?: React.ReactElement[]
}

const HTML: React.FC = (props: HtmlProps) => {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

export default HTML
