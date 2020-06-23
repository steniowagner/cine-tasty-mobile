module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    jest: true,
    'detox/detox': true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'prettier/@typescript-eslint',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'import/no-unresolved': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
    'react/jsx-max-props-per-line': [1, { maximum: 1, when: 'always' }],
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/prop-types': 'off',
    'import/prefer-default-export': 'off',
    'max-len': 'off',
    'react/jsx-first-prop-new-line': [1, 'always'],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': [
      'warn',
      {
        devDependencies: true,
        optionalDependencies: true,
        peerDependencies: true,
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  plugins: ['react', 'detox', '@typescript-eslint', 'import'],
};
