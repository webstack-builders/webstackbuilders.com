# Webstack Builders Company Website

_Fully customizable blog template with a React.js front-end._

Deployed from [sanity.io/create](https://www.sanity.io/create/?template=sanity-io%2Fsanity-template-gatsby-blog).

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

## What this is

- A blazing fast company website with [Gatsby.js](https://gatsbyjs.org)
- Structured content using [Sanity.io](https://www.sanity.io)
- Global deployment on [Netlify](https://netlify.com)

## What’s Included?

Your environment will have everything you need to build a headless CMS backend / React frontend project:

- React, JSX, ES6, and TypeScript syntax support.
- Language extras beyond ES6 like the object spread operator.
- Autoprefixed CSS, so you don’t need `-webkit-` or other prefixes.
- A fast interactive unit test runner with built-in support for coverage reporting.
- A live development server that warns about common mistakes.
- A build script to bundle JS, CSS, and images for production, with hashes and sourcemaps.
- An offline-first [service worker](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers) and a [web app manifest](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/), meeting all the [Progressive Web App](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app) criteria.
- Hassle-free updates for the above tools with a single dependency.

## Quick start

1. Clone this repository
2. `npm install` in the project root folder on local
3. `npm run dev` to start the studio and frontend locally
   - Your studio should be running on [http://localhost:3333](http://localhost:3333)
   - Your frontend should be running on [http://localhost:8000](http://localhost:8000)
4. `npm run build` to build to production locally

## Philosophy

- **One Dependency:** There is only one build dependency. It uses webpack, Babel, ESLint, and other amazing projects, but provides a cohesive curated experience on top of them.

- **No Configuration Required:** You don't need to configure anything. A reasonably good configuration of both development and production builds is handled for you so you can focus on writing code.

## System requirements

*Node*: v15.0.0 or higher
*npm*: v7.0.0 or higher, so that peer dependencies from the config packages are automatically installed

## Enable real-time content preview on development

1. Go to your [project’s API settings on manage.sanity.io](https://manage.sanity.io/projects/h9421zzw/settings/api) and create a token with read rights.
2. Rename `.env.development.template` to `.env.development` and paste in the token: `SANITY_READ_TOKEN="yourTokenHere"`.
3. Restart the development server (`ctrl + C` and `npm run dev`).

If you want to turn off preview you can set `watchMode: false` in gatsby-config.js. If you just want to preview published changes you can set `overlayDrafts: false` in gatsby-config.js.

## Deploy changes

Netlify automatically deploys new changes committed to master on GitHub. If you want to change deployment branch, do so in [build & deploy settings on Netlify](https://www.netlify.com/docs/continuous-deployment/#branches-deploys).

## Code Quality

Our ESLint configuration is a mixture between ESLint's recommended rules [^1], React's recommended rules [^2], and a bit of our own stylistic flair:

- no semicolons
- comma dangle when multiline
- single quotes
- always use parenthesis around arrow functions
- enforced import sorting

[^1] [https://eslint.org/docs/rules/](https://eslint.org/docs/rules/)
[^2] [https://www.npmjs.com/package/eslint-plugin-react#list-of-supported-rules](https://www.npmjs.com/package/eslint-plugin-react#list-of-supported-rules)

## Spell Checking

The repo uses the `cspell` plugin for ESLint to perform spell checking. New vocabulary can be added to the project in the `.vscode/settings.json` file under the key for `cspell`.

## Package Dependencies

If you're adding a new dependency to a package (and not the web or studio sides), use `lerna add`. This manages both the installation and the symlinking of packages, local or remote. To add a remote dependency like `lodash.throttle`, use `lerna add` and specify either a path to your package or a `--scope` flag.

```bash
npx lerna add lodash.throttle ./packages/my-package
# OR
npx lerna add lodash.throttle --scope @myorg/my-package
```

In our case we also have local dependencies where one managed package depends on another. Using the same command, Lerna is able to install  and symlink a local dependency by specifying the package name.

```bash
npx lerna add @myorg/my-package ./packages/my-other-package
# OR
npx lerna add @myorg/my-package --scope @myorg/my-other-package
```

Peer dependencies such as `react`, `react-dom`, or `styled-components` should be added in the relevant `package.json` using carat notation. They should then be installed as `devDependencies`  **at the root of the repository** using the traditional `npm install react -D`. This ensures that during development everything is available to compilation and your editor.

`@types` packages should also be installed at the **root** of the repository as a development dependency.

## Developing with `eslint-config-company-website` and `prettier-config-company-website` Packages

Please see the README files in the packages for instructions on local development.

## Publishing Packages

`version` and `publish` scripts in root `package.json` are only useful when developing on config packages, as `web` and `studio` are private repos.

## Editor Settings

The repo includes recommended extensions for VS Code that will be suggested to the user when they load the project in their editor. The directives for this are in `.vscode/extensions.json`.

Settings for the VS Code extension `cspell` are in the `.vscode/settings.json` file. You can disable spell checking in a document using comments:

```javascript
// cSpell:disable
const wackyWord = ['zaallano', 'wooorrdd', 'zzooommmmmmmm'];
/* cSpell:enable */
```

## Miscellaneous Notes

- If the version of the TypeScript compiler specified in a workspace is more recent than the version in use by VS Code, the TypeScript engine that VS Code runs in watch mode will ignore the workspace `tsconfig.json` files. The following settings in `.vscode/settings.json` tell VS Code to use the workspace version of `tsc`:

```json
  ...
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
  ...
```

## @TODO:

- Set up Sanity hook for Netlify to rebuild when content changes. An example [using Contentful](https://www.netlify.com/blog/2020/04/24/automate-contentful-deploys-with-netlify-webhooks/).
- The ESLint and Prettier config is messed up for packages. I think in theme-preset-website it's walking up to the project root and pulling ESLint config from the root `package.json file`. Linting the package produces the following two errors:
`File ignored because of a matching ignore pattern. Use "--no-ignore" to override`
`React version was set to "detect" in eslint-plugin-react settings, but the "react" package is not installed. Assuming latest React version for linting.`
- Unable to resolve path to module './theme' in index.ts -- error due to eslint config setup in import/resolver
- The eslint-config-company-website has a catch-22 in that it's providing its own eslint config, so no linting is set up. The prettier config package has a similar issue with using prettier.
- Config for eslint ran through VS Code (Problems tab) and ran from npx give two different results. In `web/src/html.tsx`, VS Code gives the error `Generic type 'HTMLAttributes<T>' requires 1 type argument(s).` but running from npx doesn't
- Project `.gitignore` has `package-lock.json` files in `packages`  so that users must use `lerna add` to add dependencies. Need to have a preinstall hook in npm to warn the user or alias to `lerna add`, and this isn't the right way to do so (using .gitignore)
- Consider adding `lockfile-lint`, `semantic-release` and `@commitlint` to workflow?
- Current naming for packages restricts them to this website (`*-company-website`). Maybe a more generic name, and republishing them to NPM?
- Move Jest global config to package skeleton already set up. Use `preset` key in project `jest.config.ts` files to load package config. Use `reporters` key to  to add custom reporter to Jest. Might need to set up some way to define the project root (like `redwood.toml`) for `cacheDirectory` and `coverageDirectory` keys that specify a directory, or maybe these should be per-project and not in the root directory.
- Add typescript to eslint and prettier packages, so the config can be typechecked the way Jest config is done.
- Move Studio dashboard-widget-structure-menu plugin into a package
- Add Cypress e2e tests and use cypress-axe accessibility testing plugin
- Add StoryBook
- Add linting to CI workflow. Alternative to using something like `lint-staged`, which adds a `husky` hook to run the linter on staged files on commit.
- Add `semantic-release` (release notes generation) and `commitizen` (version bump and changelog generation):

packages `commitizen`, `cz-conventional-changelog`, `semantic-release`, and `lint-staged`:

```json
// package.json
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  },
  "lint-staged": {
    "*.ts": "eslint --cache --cache-location .eslintcache --fix"
  },
```

- Set up the Dockerfile to build and use Docker for tests

- Add any external scripts that won't be auto-detected by VSCode to `.vscode/tasks.json` .



