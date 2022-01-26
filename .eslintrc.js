module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'mobx', 'prettier'],
  extends: [
    '@react-native-community',
    'airbnb',
    'airbnb/hooks',
    'silence',
    'prettier',
  ],
  rules: {
    'react/prop-types': 'off',
    'react/function-component-definition': 'off',
    'prettier/prettier': [
      'error',
      {
        bracketSpacing: true,
        singleQuote: true,
        trailingComma: 'all',
        arrowParens: 'always',
      },
    ],
  },
  overrides: [
    {
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': [
          'warn',
          { variables: false },
        ],
        'import/extensions': [
          'error',
          'ignorePackages',
          {
            ts: 'never',
            tsx: 'never',
            js: 'never',
            jsx: 'never',
          },
        ],
      },
      extends: ['airbnb-typescript'],
    },
  ],
};
