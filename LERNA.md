### Dependencies

If you're adding a new dependency to a package, use `lerna add`. This manages both the installation and the symlinking of packages, local or remote. To add a remote dependency like `lodash.throttle`, use `lerna add` and specify either a path to your package or a `--scope` flag.

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



