# `@webstackbuilders/prettier-config`

> TODO: description

## Usage

```javascript
"prettier": "@webstackbuilders/prettier-config-company-website"
```

## Development

You can either use a private and local package registry (Verdaccio) or `npm link`:

```bash
cd ~/packages/prettier-config-company-website   # go into the package directory
npm link                                        # creates global link
cd ~/web                                        # go into a different package directory.
npm link prettier-config-company-website        # link-install the package
```
