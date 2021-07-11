# `@webstackbuilders/eslint-config-company-website`
This is Webstack Builders' ESLint configuration for our company website and other projects. Bundling it in an NPM package allows it to be reused across the website monorepo seamlessly, following ESLint's `eslint-config-<your-app-name>` convention.

## Installation
Run the following command to install this package:

```bash
npm install --save-dev @webstackbuilders/eslint-config-company-website
```

If you are using NPM v7 or higher, this package's peer dependencies will be automatically installed. If you're using a lower version of NPM, you'll need to install them yourself. You can get a list of the peer dependencies to install individually with this command:

```bash
npm info "@webstackbuilders/eslint-config-company-website@latest" peerDependencies
```

## Usage

You can use this configuration by adding the following to your `package.json` or including it in an `.eslintrc` file:

```javascript
"eslintConfig": {
  "extends": "@webstackbuilders/eslint-config-company-website",
  "root": true
},
```

The `root` option prevents ESLint from recursively looking for more configuration files lower in your directory tree. For more information on available configuration options to override, see [ESLint's documentation](https://eslint.org/docs/rules/).

## Editor Plugins

You can use ESLint with an editor plugin that automatically lints files on every save. For VS Code, our recommended ESLint plugin is [`dbaeumer.vscode-eslint`](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint). There are ESLint plugins for most editors. See the full list of [editor integrations here](https://eslint.org/docs/user-guide/integrations).

## Presets

Our ESLint configuration is a mixture of the following presets:

- [ESLint's recommended rules](https://eslint.org/docs/rules/)
- [React's recommended rules](https://www.npmjs.com/package/eslint-plugin-react#list-of-supported-rules)
- [React's Rules of Hooks](https://reactjs.org/docs/hooks-rules.html)
- [Jest recommended rules](https://github.com/testing-library/eslint-plugin-jest-dom#supported-rules)

And a bit of our own stylistic flair:

- no semicolons
- comma dangle (trailing commas) when multiline
- single quotes
- always use parenthesis around arrow functions, even when there's a single parameter
- enforced import sorting
- ensure that block statements are wrapped in curly braces, even when a block contains only one statement

## Important Notes

This configuration doesn't include any rules that will conflict with using Prettier for code formatting. You should ensure any overrides you add don't cause conflicts if you're using Prettier.

Some ESLint configurations (for example the default Gatsby configuration) also lint GraphQL tagged literal queries. Doing so requires the GraphQL schema to be injected into the ESLint config. The Webstack Builder's company website project skips this (overriding Gatsby's default linting config) in favor of other tooling - ymmv.

## Development

For local development on this package, you can use `npm link` to test your changes:

```bash
cd ~/packages/eslint-config-company-website   # go into the package directory
npm link                                        # creates global link
cd ~/web                                        # go into a different package directory.
npm link eslint-config-company-website        # link-install the package
```

### Running a Local NPM Registry

Sometimes you'll want to test the full package-development workflow: building, publishing, and installing all the packages in your local copy of a project. We accommodate this using a local NPM registry called  [Verdaccio](https://verdaccio.org/).

First, install Verdaccio:

```bash
npm install verdaccio --global
```

Then run the following in a terminal from the package root:

```bash
set -e; verdaccio --config verdaccio.yml
```

This starts Verdaccio (on http://localhost:4873).
