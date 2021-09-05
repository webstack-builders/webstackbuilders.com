# webstackbuilders.com-studio

## TypeScript in the Studio

Sanity CLI uses Babel to compile TypeScript with config from `.babelrc`. The `tsconfig.json` file is only used by VS Code and ESLint.

## Sanity Studio Plugins Used

Required in `sanity.json`:

- [@sanity/base](https://www.npmjs.com/package/@sanity/base) - Plugin containing the base components and roles for a Sanity configuration.
- **@sanity/components - This module is deprecated.**
- [@sanity/default-layout](https://www.npmjs.com/package/@sanity/default-layout) - Provides a "sidecar" if there is an implementation of the part `part:@sanity/default-layout/sidecar`, like `studio-hints`.
- [@sanity/default-login](https://www.npmjs.com/package/@sanity/default-login) - Let a user log into Sanity and get access to child content. By default this component will ask the Sanity API and get a list of providers, which the user can login with.
- [@sanity/dashboard](https://www.npmjs.com/package/@sanity/dashboard) - Picks up and renders any widgets which implement `part:@sanity/dashboard/widget`. Specify the widgets in a `dashboardConfig.ts` file referenced as an implementation for `dashboard` in `studio/sanity.json`. Built-in widgets are `project-info` and `project-users`. Widgets from plugins are `structure-menu` (implementation in this repo) and `document-list` (npm package).
- @sanity/desk-tool - Tool for managing all sorts of content in a structured manner.
- [dashboard-widget-document-list](https://www.npmjs.com/package/sanity-plugin-dashboard-widget-document-list) - Dashboard widget that displays a list of documents. Fetches based on document (schema) types specified by `types` configuration option in the `dashboardConfig.ts` file. Set to show recent blog posts based on `post` document type. Can also fetch based on a GROQ query with parameters.
- [dashboard-widget-netlify](https://www.npmjs.com/package/sanity-plugin-dashboard-widget-netlify) (*sanity-plugin-dashboard-widget-netlify*) - Widget for triggering Netlify builds from the Studio.
- dashboard-widget-structure-menu - Project-specific widget for this studio, implementation is in the `studio/plugins` directory.

Not listed in `sanity.json`:

- @sanity/core - Sanity core bundle, containing required packages for the development and build process.
- [@sanity/studio-hints](https://www.npmjs.com/package/@sanity/studio-hints) - 

## Dependencies to consider adding

@testing-library/jest-dom
@testing-library/react
@types/node
@types/react-dom
jest
jest-date-mock
react-dom
ts-jest
tsconfig-paths-jest
typescript

## @TODO:

1. Getting the error `Unknown browser query maintained node versions` when `.browserslistrc` has `maintained node versions`, which should specify Node v12 and higher

1. Credentials need moved to env vars from `studio/sanity.json`,  `dashboardConfig.ts`, and:

```javascript
// deskStructure.ts
const remoteURL = 'https://webstackbuilders-com.netlify.app'
const localURL = 'http://localhost:8002'
```
3. Set up logging for production and error handling. `iframePreview.tsx` has error handling logic for 'Missing slug or preview URL' and failure to build the page.
