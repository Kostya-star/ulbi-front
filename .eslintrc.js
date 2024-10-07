module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:i18next/recommended',
    // "plugin:react-hooks/recommended",
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'react-hooks',
    // my custom written eslint plugin to check for paths
    'front-fresh',
  ],
  rules: {
    // 'react/jsx-indent': [2, 4],
    // 'react/jsx-indent-props': [2, 4],
    // indent: [2, 4],
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.tsx'] }],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'warn',
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'warn',
    'react/function-component-definition': 'off',
    'no-shadow': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-underscore-dangle': 'off',
    'jsx-quotes': [0, 'prefer-single'],
    quotes: [0, 'single', { avoidEscape: true }],
    'i18next/no-literal-string': [
      'error',
      {
        markupOnly: true,
        ignoreAttribute: [
          'data-testid',
          'to',
          'target',
          'justifyContent',
          'alignItems',
          'flexDirection',
          'gap',
          'tag',
          'as',
          'direction',
          'borderRadius',
          'side',
        ],
      },
    ],
    'linebreak-style': 0,
    'max-len': ['error', { code: 125, ignoreComments: true }],
    'implicit-arrow-linebreak': 'warn',
    // disable the warning for functions declarations
    'no-use-before-define': ['error', { functions: false }],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "no-return-assign": "off",
    "arrow-body-style": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "no-param-reassign": "off",
    "no-undef": "off",
    "react/no-array-index-key": "off",
    // custom written eslint plugin to check for paths
    "front-fresh/path-checker": ["error", { alias: '@' }],
    "front-fresh/public-api-imports": ["error", {
      alias: '@',
      testFilesPatterns: ['**/*.test.*', '**/*.story.*', '**/StoreDecorator.tsx'],
    }],
    "front-fresh/layers-imports": ["error", {
      alias: '@',
      ignoreImportPatterns: [
        '**/StoreProvider',
        '**/routeConfig',
        '**/ThemeProvider',
      ],
    }],
  },
  globals: {
    __IS_DEV__: true,
    __API_URL__: true,
    __PROJECT__: true,
  },
  overrides: [
    {
      files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
      rules: {
        'i18next/no-literal-string': 'off',
        'max-len': 'off',
      },
    },
  ],
};
