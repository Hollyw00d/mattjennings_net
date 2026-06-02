import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

export default [
  {
    ignores: [
      'node_modules/**',
      'build/**',
      'package.json',
      'package-lock.json'
    ]
  },
  js.configs.recommended,
  prettier,
  {
    plugins: {
      import: importPlugin
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      semi: ['error', 'always'],
      'no-console': 'warn',
      'class-methods-use-this': 'off',
      'no-plusplus': 'off'
    }
  }
];