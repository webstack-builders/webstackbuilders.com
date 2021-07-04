module.exports = {
  env: {
    node: true,
    browser: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:jest-dom/recommended",
    // "plugin:prettier/recommended",
    "plugin:react/recommended",
  ],
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "react/prop-types": "off",
  },
  settings: {
    react: {
      pragma: "React",
      version: "detect",
    },
  },
};
