import { fixupPluginRules } from '@eslint/compat';
import js from '@eslint/js';
import playwright from 'eslint-plugin-playwright';
import prettier from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    name: 'ignore',
    ignores: [
      'node_modules',
      '**/dist',
      '**/rollup',
      '**/node_modules',
      '**/babel.config.js',
    ],
  },
  {
    name: 'main',
    plugins: {
      react,
      'react-hooks': fixupPluginRules(reactHooks),
    },

    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        pragma: 'React',
        version: 'detect',
      },
    },

    rules: {
      'no-var': 0,
    },
  },
  {
    name: 'simple-import-sort',
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
    },
  },
  {
    name: 'typescript',
    files: ['**/*.test.ts', '**/*.test.tsx'],
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
  {
    name: 'playwright',
    ...playwright.configs['flat/recommended'],
    files: ['./packages/examples-e2e/test/*.spec.ts'],
  },
  prettier,
);
