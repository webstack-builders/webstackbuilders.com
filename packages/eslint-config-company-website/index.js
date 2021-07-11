module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:jest-dom/recommended',
    'plugin:jsx-a11y/recommended',
    "plugin:prettier/recommended",
    'plugin:react/recommended',
    "prettier",
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    requireConfigFile: false,
    resolvePluginsRelativeTo: __dirname,
    sourceType: 'module',
  },
  plugins: [
    'import',
    'jest-dom',
    'jsx-a11y',
    'react-hooks',
    'react',
    'prettier',
  ],
  rules: {
    camelcase: ['warn', { properties: 'never' }],
    curly: ['error', 'all'],
    'import/no-webpack-loader-syntax': [0],
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
    'new-cap': ['error', { newIsCap: true, capIsNew: false }],
    'no-console': 'off',
    'no-new': 'warn',
    'no-unused-expressions': [
      'error',
      { allowShortCircuit: true, allowTernary: true },
    ],
    'no-unused-vars': [
      'error',
      { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
    ],
    'no-useless-escape': 'off',
    'prefer-object-spread': 'warn',
    'prefer-spread': 'warn',
    // "prettier/prettier": "warn",
    // React rules
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react/display-name': 'off',
    'react/jsx-pascal-case': [
      'warn',
      {
        allowNamespace: true,
      },
    ],
    'react/prop-types': [
      'warn',
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
      extends: ['plugin:yaml/recommended']
    },
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
      rules: {
        '@typescript-eslint/ban-types': 'warn',
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
        ],
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        camelcase: 'off',
        'no-empty-function': 'off',
        'no-use-before-define': 'off',
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
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
}
