"use strict";
/*
 * If you need to insert custom HTML into the <head> or <footer> of each page on your site, you can use html.js.
 * Customizing html.js is a workaround solution for when the use of the appropriate APIs is not available in gatsby-ssr.js.
 * Consider using onRenderBody or onPreRenderHTML instead of the method above. As a further consideration, customizing
 * html.js is not supported within a Gatsby Theme. Use the API methods mentioned instead.
 */
exports.__esModule = true;
require("styles/normalize.css");
// Anything you render in the html.js component will not be made “live” in the client like other
// components. If you want to dynamically update your <head> we recommend using React Helmet.
// If you want to insert custom HTML into the footer, html.js is the preferred way of doing this.
// If you’re writing a plugin, consider using the setPostBodyComponents prop in the Gatsby SSR API.
var HTML = function (props) {
    return (<html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8"/>
        <meta httpEquiv="x-ua-compatible" content="ie=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div key={"body"} id="___gatsby" dangerouslySetInnerHTML={{ __html: props.body }}/>
        {props.postBodyComponents}
      </body>
    </html>);
};
exports["default"] = HTML;
//# sourceMappingURL=html.js.map