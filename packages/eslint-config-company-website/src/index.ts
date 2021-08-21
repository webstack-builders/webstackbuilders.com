const level = process.env.NODE_ENV === 'production' ? 'error' : 'warn'

const baseEslintConfig = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  // TypeScript files are processed by an override lower in this file
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
  parser: '@babel/parser',
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
    camelcase: [level, { properties: 'never' }],
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
    'no-console': 'off',
    'no-new': level,
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
    // "prettier/prettier": "warn",
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
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-unused-vars': [
          level,
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
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
}

export = baseEslintConfig
