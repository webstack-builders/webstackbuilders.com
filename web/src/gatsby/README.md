# Folder `src/gatsby`

This directory is to organize code included in `gatsby-*` files in the `web` root, for example to provide a central `createPages` API call. Folders correspond to root Gatsby config files, e.g. `gatsby/gatsy-node` for `gatsby-node.js`.

## TypeScript with Gatsby config files

As of July 2021 there's no clean way to use TypeScript in Gatsby config files, or any file they require directly. Using `ts-node` to transliterate TypeScript files to Javascript in any of the core Gatsby config files creates problems with caching of those config files, which hard-codes a `.js` file extension.


*Is it possible to write the gatsby config in TypeScript?* [issue #1457](https://github.com/gatsbyjs/gatsby/issues/1457)

The `gatsby-plugin-ts-config` plugin has a v2 major update in the works to allow use with Gatsby v3. It handles edge cases beyond just using `ts-node`. Currently has a PR open on Gatsby to fix Webpack caching of a `.js` extension for gatsby-node before v2 is production ready.


