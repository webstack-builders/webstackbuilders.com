# Folder `src/gatsby`

This project uses `ts-node` in `gatsby-config.js` to allow a typechecked config file.

Gatsby will automatically transform `gatsby-*.ts` and `gatsby-*.tsx` files after loading `gatsby-config.js`.

This directory is to organize code included in `gatsby-*` files in the `web` root, for example to provide
a central `createPages` API call.
