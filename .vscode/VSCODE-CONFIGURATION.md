# VS Code Editor Configuration Files

## There are three core files in the `.vscode` directory used by VS Code:

- `extensions.json`: this file provides a list of suggested extensions to install when users first open the project in a VS Code instance.
- `launch.json`: this file provides configuration for debugger setups that will be available in the left-side pane drop down combo box when the debug tool is selected.
- `settings.json`: this file holds workspace-specific VS Code configuration.

## JSON Schemas

VS Code can provide intellisense and linting for JSON files that have a schema provided. Schemas for `package.json`, `tsconfig.json`, and the core VS Code configuration files listed above are built into VS Code. [Additional schemas](https://www.schemastore.org/json/) are added in the `json-schemas` directory and reference from the VS Code `settings.json` file to load them in the workspace.
