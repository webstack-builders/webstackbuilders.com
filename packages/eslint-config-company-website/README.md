# `@webstackbuilders/eslint-config`

Shared ESLint configuration for all Webstack Builders company website packages

## Usage

Include in an `.eslintrc` or `package.json` file where you want to use the ESLint config:

```javascript
"eslintConfig": {
  "extends": "@webstackbuilders/eslint-config-company-website",
  "root": true
},
```

## Development

You can either use a private and local package registry (Verdaccio) or `npm link`:

```bash
cd ~/packages/eslint-config-company-website   # go into the package directory
npm link                                      # creates global link
cd ~/web                                      # go into a different package directory.
npm link eslint-config-company-website        # link-install the package
```

Note from a comment on WebStorm IDE:

> The IDE starts a ESLint process for every package.json that contains a eslint dependency and processes everything below it as if it was invoked with `.bin/eslint **/*.js`.
