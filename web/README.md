# Repo for the webstackbuilders.com company website

## Babel

The default Gatsby Babel configuration is over-ridden to allow for the decorators proposal and browser targeting.

## `web/tsconfig.json`

This file is included for NPM to use when running ESLint from the command line. It is *not* used by Gatsby's toolchain.

## Relative file imports

This lets you use syntax like this:

```javascript
import Something from 'components/something.tsx'
```

Instead of:

```javascript
import Something from '../something.tsx'
```

Gatsby uses Webpack config in `gatsby-config` for the `gatsby-plugin-root-import` plugin to specify the relative path mappings. ESLint uses `tsconfig.json` for the mappings, so the relative paths have to be maintained in both places :(

## TypeScript and Gatsby Config Files

See the [readme file](gatsby/README.md) in the gatsby directory for info on using TypeScript with Gatsby config files.

## @TODO:

### gatsby-plugin-google-gtag

Easily add Google Global Site Tag to your Gatsby site. The global site tag (gtag.js) is a JavaScript tagging framework and API that allows you to send event data to Google Analytics, Google Ads, Campaign Manager, Display & Video 360, and Search Ads 360.

### gatsby-plugin-manifest

The web app manifest (part of the PWA specification) enabled by this plugin allows users to add your site to their home screen on most mobile browsers — see here. The manifest provides configuration and icons to the phone.

### gatsby-plugin-offline

Adds drop-in support for making a Gatsby site work offline and more resistant to bad network connections. It uses Workbox Build to create a service worker for the site and loads the service worker into the client. If you're using this plugin with gatsby-plugin-manifest (recommended) this plugin should be listed after that plugin so the manifest file can be included in the service worker.

### Prevent unmount of shared navigation components

Gatsby's “top level” component is the page itself. As a result, when the “top level” component changes between pages, React will re-render all children. This means that shared components like navigations will unmount and remount. This will break CSS transitions or React state within those shared components. If you need to set a wrapper component around page components that won’t get unmounted on page changes, use the `wrapPageElement` browser API and the SSR equivalent. Alternatively, you can prevent your layout component from unmounting by using `gatsby-plugin-layout`, which implements the `wrapPageElement` APIs for you.
