const restrictedGlobals = require('confusing-browser-globals')
const level = process.env.NODE_ENV === 'production' ? 'error' : 'warn'

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jest-dom/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:node/recommended',
    'plugin:react/recommended'    'prettier', // must be last in list
  ],
  plugins: [
    '@typescript-eslint',
    'import',
    'jest-dom',
    'jsdoc',
    'jsx-a11y',
    'node',
    'no-null',
    'react-hooks',
    'react',
  ],
  rules: {
    // Base ESLint Rules

    'arrow-body-style': 'off', // problematic rule with Prettier https://github.com/prettier/eslint-plugin-prettier/issues/65
    camelcase: [level],
    curly: [level, 'all'],
    'import/no-unresolved': level,
    'import/no-webpack-loader-syntax': level,
    'import/order': [
      level,
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'ignore',
      },
    ],
    'new-cap': [level, { newIsCap: true, capIsNew: false }],
    'no-new': level,
    'no-null/no-null': 2,
    'no-restricted-globals': ['error'].concat(restrictedGlobals),
    'no-unused-expressions': [
      level,
      { allowShortCircuit: true, allowTernary: true },
    ],
    'no-unused-vars': [
      level,
      { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
    ],
    'no-useless-escape': 'off',
    'prefer-arrow-callback': 'off', // problematic rule with Prettier https://github.com/prettier/eslint-plugin-prettier/issues/65
    'prefer-object-spread': level,
    'prefer-spread': level,

    // Node Rules

    // @TODO: When using transpilers (e.g. Babel), the file path to a source code may never be published.
    // convertPath option tells to the rule, it needs to convert file paths.
    // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-unpublished-import.md
    'node/no-unpublished-import': [
      level,
      {
        'allowModules': ['electron']
      },
    ],

    // React Rules

    'react-hooks/exhaustive-deps': level,
    'react-hooks/rules-of-hooks': level,
    'react/display-name': 'off',
    'react/jsx-pascal-case': [
      level,
      {
        allowNamespace: true,
      },
    ],
    'react/prop-types': [
      level,
      {
        skipUndeclared: true,
        ignore: ['style', 'children', 'className', 'theme'],
      },
    ],
    'react/react-in-jsx-scope': 'off',

    // TypeScript Rules

    '@typescript-eslint/explicit-module-boundary-types': 'off', // avoid un-fixable lint errors reported within .js/.jsx files, https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-module-boundary-types.md
    '@typescript-eslint/no-var-requires': 'off', // allow JS files to use `require`, overridden below for TS files

    // JSDoc Rules
    'jsdoc/check-access': 1,
    'jsdoc/check-alignment': 1,
    'jsdoc/check-examples': 1,
    'jsdoc/check-indentation': 1,
    'jsdoc/check-line-alignment': 1,
    'jsdoc/check-param-names': 1,
    'jsdoc/check-property-names': 1,
    'jsdoc/check-syntax': 1,
    'jsdoc/check-tag-names': 1,
    'jsdoc/check-types': 1,
    'jsdoc/check-values': 1,
    'jsdoc/empty-tags': 1,
    'jsdoc/implements-on-classes': 1,
    'jsdoc/match-description': 1,
    'jsdoc/multiline-blocks': 1,
    'jsdoc/newline-after-description': 1,
    'jsdoc/no-bad-blocks': 1,
    'jsdoc/no-defaults': 1,
    'jsdoc/no-multi-asterisks': 1,
    'jsdoc/no-types': 1,
    'jsdoc/tag-lines': 1,
    'jsdoc/valid-types': 1,
  },
  overrides: [
    {
      files: ['*.yaml', '*.yml'],
      plugins: ['yaml'],
      extends: ['plugin:yaml/recommended'],
    },
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
      rules: {
        '@typescript-eslint/ban-types': level,
        '@typescript-eslint/explicit-module-boundary-types': level,
        '@typescript-eslint/no-unused-vars': [
          level,
          { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
        ],
        '@typescript-eslint/no-var-requires': level,
        camelcase: level,
      },
    },
    {
      files: ['*.test.*', '**/__mocks__/**'],
      env: {
        node: true,
        es6: true,
        commonjs: true,
        jest: true,
      },
    },
    {
      files: [
        '.babelrc.js',
        'babel.config.js',
        '.eslintrc.js',
        '*.config.js',
        'jest.setup.js',
      ],
      env: {
        node: true,
        commonjs: true,
        jest: true,
      },
    },
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    requireConfigFile: false,
    resolvePluginsRelativeTo: __dirname,
    sourceType: 'module',
  },
}
