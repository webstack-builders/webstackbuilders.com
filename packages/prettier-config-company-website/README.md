# `@webstackbuilders/prettier-config-company-website`

This is Webstack Builders' Prettier configuration for our company website and other projects. Bundling it in an NPM package allows it to be reused across the website monorepo seamlessly, following Prettier's `prettier-config-<your-app-name>` convention. 

## Installation

```bash
npm install --save-dev @webstackbuilders/prettier-config-company-website
```

## Usage

The simplest way to use this configuration is to add the following to your `package.json`:

```json
"prettier": "@webstackbuilders/prettier-config-company-website"
```

You can also include it in a standalone JSON file like `.prettierrc.json`:

```json
"@webstackbuilders/prettier-config-company-website"
```

To extend the configuration, use a `.prettierrc.js` file and add the following:

```javascript
module.exports = {
	...require('@webstackbuilders/prettier-config-company-website'),
	semi: true,
};
```

For more information on available configuration options, see the [Prettier documentation](https://prettier.io/docs/en/configuration.html#sharing-configurations).

## Editor Plugins

You can use Prettier with an editor plugin that automatically formats files on every save. For VS Code, our recommended Prettier plugin is [`esbenp.prettier-vscode`](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode). There are Prettier plugins for most editors. See the full list on [prettier.io](https://prettier.io/).

## Commit Hooks

You can set up a commit hook to ensure that no new code is committed without being formatted. To format staged files with Prettier before each commit, you can use [`pretty-quick`](https://github.com/azz/pretty-quick) with [`husky`](https://github.com/typicode/husky/).

```bash
npm install --save-dev pretty-quick husky
```

Add the following to `package.json`:

```json
"husky": {
	"hooks": {
		"pre-commit": "pretty-quick --staged"
	}
}
```

## Continuous Integration

To ensure that code is formatted as part of the continuous integration (CI) process, you can use [`pretty-quick`](https://github.com/azz/pretty-quick). Since `pretty-quick` only looks at changed files, it will only fail CI when there are unformatted files in the current branch. Add the following to your CI configuration:

```bash
npx pretty-quick --check
```

Optionally, use [the `--branch` flag](https://github.com/azz/pretty-quick#--branch) to set the base branch to something other than `main`.

## Converting an Existing Project to Prettier

To convert an entire project to Prettier format:

1. Add ignored directories and files to `.prettierignore`. Copying the contents of your `.gitignore` to your `.prettierignore` might be a good starting point.
2. Run the following command, adding or removing file extensions from the list to meet your needs:

```bash
npx prettier --write '**/*.{js,ts,md,json,yml,yaml,css,scss,less,graphql,mdx,jsx,tsx}'
```

## Development

For local development on this package, you can either use a private and local package registry like [Verdaccio](https://verdaccio.org/), or `npm link` to test your changes:

```bash
cd ~/packages/prettier-config-company-website   # go into the package directory
npm link                                        # creates global link
cd ~/web                                        # go into a different package directory.
npm link prettier-config-company-website        # link-install the package
```

The Webstack Builders company website monorepo has versioning commands available to add semver tags to this package, and a publish command to push your changes to the NPM repository.
