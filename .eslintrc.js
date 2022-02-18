module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-tabs': 0,
    'no-console': 0,
    semi: 0,
    'max-len': 0,
    'consistent-return': 0,
    'react/prop-types': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,
    'default-param-last': 0,
    'import/no-named-as-default': 0,
  },

};
