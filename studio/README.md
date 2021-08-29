# webstackbuilders.com-studio

## TypeScript in the Studio

Sanity CLI uses Babel to compile TypeScript with config from `.babelrc`. The `tsconfig.json` file is only used by VS Code and ESLint.

## @TODO:

1. Getting the error `Unknown browser query maintained node versions` when `.browserslistrc` has `maintained node versions`, which should specify Node v12 and higher

1. Credentials need moved to env vars:

```javascript
// deskStructure.ts
const remoteURL = 'https://webstackbuilders-com.netlify.app'
const localURL = 'http://localhost:8002'
```
