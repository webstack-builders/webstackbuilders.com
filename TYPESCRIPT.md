Make sure that `main`, `typings`, and a `prepublishOnly` script is defined in all TypeScript `package.json` files and declaration is set to true in `tsconfig.json`. These fields tell the consuming codebase where the type definitions are, what the entry point is, and most importantly how to build each pacakge:

```json
{
  "name": "@myorg/components",
  "version": "1.2.3",
  "main": "lib/index.js",  "typings": "lib/index.d.ts",  "scripts": {
    "prepublishOnly": "tsc"  }
}
```

Each package defines its own `tsconfig.json` which all extend a single `tsconfig.settings.json` file placed inside the root folder:

```json
// ./tsconfig.settings.json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "esModuleInterop": true,
    "jsx": "react"
  }
}

// ./packages/my-package/tsconfig.json
{
  "extends": "../tsconfig.settings.json",  "compilerOptions": {
    "outDir": "lib",    "rootDir": "src"  }
}
```

`outDir` in `tsconfig.json` should be set to the same location defined in the `main` field in `package.json`.
