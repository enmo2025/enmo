import js from '@eslint/js';
import json from '@eslint/json';
import pluginQuery from '@tanstack/eslint-plugin-query';
import tsParser from '@typescript-eslint/parser';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import sonarjs from 'eslint-plugin-sonarjs';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: [
      'node_modules/**/*',
      'dist/**/*',
      'build/**/*',
      '.react-router/**/*',
      'coverage/**/*',
      'app/components/base/**/*',
      'src/components/ui/**/*',
      '.next/**/*',
      'out/**/*',
    ],
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          project: './tsconfig.json',
        },
      },
    },
    plugins: {
      sonarjs,
    },
    rules: {
      ...sonarjs.configs.recommended.rules,
      // sonarjs rules override
      'sonarjs/todo-tag': 'warn',
      'sonarjs/no-unused-collection': 'warn',
      'sonarjs/redundant-type-aliases': 'warn',
      'sonarjs/no-nested-conditional': 'warn',
      'sonarjs/no-nested-functions': 'warn',
      'sonarjs/no-commented-code': 'off',
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: [
      'node_modules/**/*',
      'dist/**/*',
      'build/**/*',
      '.react-router/**/*',
      'coverage/**/*',
      'src/components/ui/**/*',
      '.next/**/*',
      'out/**/*',
    ],
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          project: './tsconfig.json',
        },
      },
    },
    plugins: {
      js,
      'react-hooks': pluginReactHooks,
      react: pluginReact,
      '@typescript-eslint': tseslint,
      prettier: pluginPrettier,
      '@tanstack/query': pluginQuery,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      ...pluginQuery.configs.recommended.rules,
      // react rules override
      'react/prop-types': 'off',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // ts rules override
      'no-unused-vars': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      // common rules override
      'prettier/prettier': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      semi: ['error', 'always'],
    },
  },
  {
    files: ['public/locales/**/*.json'],
    plugins: { json, prettier: pluginPrettier },
    language: 'json/json',
    rules: {
      ...json.configs.recommended.rules,
      'json/sort-keys': 'error',
      'prettier/prettier': 'error',
    },
  },
]);
