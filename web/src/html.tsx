import React from 'react'
import { ThemeProvider } from 'theme-ui'
import theme from './theme'

interface HtmlProps {
  htmlAttributes?: React.HTMLAttributes
  headComponents?: React.ReactElement[]
  bodyAttributes?: React.AllHTMLAttributes
  preBodyComponents?: React.ReactElement[]
  body: string
  postBodyComponents?: React.ReactElement[]
}

const HTML: React.FC<HtmlProps> = (props) => {
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
        <ThemeProvider theme={theme}></ThemeProvider>
          {props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: props.body }}
          />
          {props.postBodyComponents}
        </ThemeProvider>
      </body>
    </html>
  )
}

export default HTML
