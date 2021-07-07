# Webstack Builders Company Website

_Fully customizable blog template with a React.js front-end._

Deployed from [sanity.io/create](https://www.sanity.io/create/?template=sanity-io%2Fsanity-template-gatsby-blog).

## What this is

- A blazing fast company website with [Gatsby.js](https://gatsbyjs.org)
- Structured content using [Sanity.io](https://www.sanity.io)
- Global deployment on [Netlify](https://netlify.com)

## Quick start

1. Clone this repository
2. `npm install` in the project root folder on local
3. `npm run dev` to start the studio and frontend locally
   - Your studio should be running on [http://localhost:3333](http://localhost:3333)
   - Your frontend should be running on [http://localhost:8000](http://localhost:8000)
4. `npm run build` to build to production locally

## System requirements

*Node*: v15.0.0 or higher
*npm*: v7.0.0 or higher, so that peer dependencies from the config packages are automatically installed

## Enable real-time content preview on development

1. Go to your [project’s API settings on manage.sanity.io](https://manage.sanity.io/projects/h9421zzw/settings/api) and create a token with read rights.
2. Rename `.env.development.template` to `.env.development` and paste in the token: `SANITY_READ_TOKEN="yourTokenHere"`.
3. Restart the development server (`ctrl + C` and `npm run dev`).

If you want to turn off preview you can set `watchMode: false` in gatsby-config.js. If you just want to preview published changes you can set `overlayDrafts: false` in gatsby-config.js.

## Deploy changes

Netlify automatically deploys new changes commited to master on GitHub. If you want to change deployment branch, do so in [build & deploy settings on Netlify](https://www.netlify.com/docs/continuous-deployment/#branches-deploys).


Our ESLint configuration is a mixture between ESLint's recommended rules [^1], React's recommended rules [^2], and a bit of our own stylistic flair:
- no semicolons
- comma dangle when multiline
- single quotes
- always use parenthesis around arrow functions
- enforced import sorting

[^1] https://eslint.org/docs/rules/
[^2] https://www.npmjs.com/package/eslint-plugin-react#list-of-supported-rules

## Developing with `eslint-config-company-website` and `prettier-config-company-website` Packages

You can either use a private and local package registry (Verdaccio) or `npm link`:

```bash
cd ~/packages/eslint-config-company-website   # go into the package directory
npm link                                      # creates global link
cd ~/web                                      # go into a different package directory.
npm link eslint-config-company-website        # link-install the package
```

`version` and `publish` scripts in root `package.json` are only useful when developing on config packages, as `web` and `studio` are private repos

## @TODO:

1. Set up Sanity hook for Netlify to rebuild when content changes. An example [using Contentful](https://www.netlify.com/blog/2020/04/24/automate-contentful-deploys-with-netlify-webhooks/).
