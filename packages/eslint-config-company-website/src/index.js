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
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jest-dom/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'prettier',
  ],
  plugins: [
    'import',
    'jest-dom',
    'jsx-a11y',
    'react-hooks',
    'react',
    'prettier',
  ],
  rules: {
    //
    '@typescript-eslint/explicit-module-boundary-types': 'off', // avoid un-fixable lint errors reported within .js/.jsx files, https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-module-boundary-types.md
    '@typescript-eslint/no-var-requires': 'off', // allow JS files to use `require`, overridden below for TS files
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
    'prefer-object-spread': level,
    'prefer-spread': level,
    // React rules
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
