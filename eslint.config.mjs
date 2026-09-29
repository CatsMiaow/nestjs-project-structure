// @ts-check
/* eslint-disable import/no-default-export */
import eslint from '@eslint/js';
import vitest from '@vitest/eslint-plugin';
import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import { configs as sonarjs } from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import neostandard from 'neostandard';
import tseslint from 'typescript-eslint';

// https://eslint.org/docs/latest/use/configure/configuration-files
export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  ...neostandard({ env: ['node'], ts: true, semi: true, noJsx: true }),
  prettierRecommended,
  unicorn.configs.unopinionated,
  sonarjs.recommended,
  vitest.configs.recommended,
  {
    ignores: ['**/node_modules/**', 'dist/**', 'src/entity/**'],
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.mjs'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      import: importPlugin,
      vitest,
    },
    // https://github.com/import-js/eslint-plugin-import?tab=readme-ov-file#config---flat-with-config-in-typescript-eslint
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
    // These rules are for reference only.
    rules: {
      // #region eslint
      'no-undef': 'off',
      'no-use-before-define': 'off',
      'class-methods-use-this': 'off',
      complexity: ['error', 20],
      // https://github.com/typescript-eslint/typescript-eslint/issues/1277
      'consistent-return': 'off',
      'eslint-comments/require-description': 'off',
      'func-names': 'off',
      'max-len': ['error', { code: 140, ignoreTemplateLiterals: true, ignoreUrls: true }],
      'newline-per-chained-call': 'off',
      'no-await-in-loop': 'off',
      'no-continue': 'off',
      // https://github.com/airbnb/javascript/issues/1342
      'no-param-reassign': ['error', { props: false }],
      // https://github.com/airbnb/javascript/issues/1271
      // https://github.com/airbnb/javascript/blob/fd77bbebb77362ddecfef7aba3bf6abf7bdd81f2/packages/eslint-config-airbnb-base/rules/style.js#L340-L358
      'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
      'no-underscore-dangle': ['error', { allow: ['_id'] }],
      'no-void': ['error', { allowAsStatement: true }],
      'object-curly-newline': 'off',
      'spaced-comment': ['error', 'always', { line: { markers: ['/', '#region', '#endregion'] } }],
      // #endregion

      // #region import
      'import/no-default-export': 'error',
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'],
            ['internal', 'parent', 'sibling', 'index'],
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/prefer-default-export': 'off',
      // #endregion

      // #region @typescript-eslint
      '@typescript-eslint/class-methods-use-this': 'off',
      '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'angle-bracket' }],
      '@typescript-eslint/init-declarations': ['error', 'never', { ignoreForLoopInit: true }],
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'default', format: ['strictCamelCase'] },
        { selector: 'variable', format: ['strictCamelCase', 'UPPER_CASE', 'StrictPascalCase'] },
        // https://github.com/microsoft/TypeScript/issues/9458
        { selector: 'parameter', modifiers: ['unused'], format: ['strictCamelCase'], leadingUnderscore: 'allow' },
        { selector: 'property', format: null },
        { selector: 'typeProperty', format: null },
        { selector: 'typeLike', format: ['StrictPascalCase'] },
        { selector: 'enumMember', format: ['UPPER_CASE'] },
      ],
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-type-assertion': 'off',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        { allowAny: true, allowBoolean: true, allowNullish: true, allowNumber: true, allowRegExp: true },
      ],
      '@typescript-eslint/prefer-destructuring': 'off',
      '@typescript-eslint/prefer-readonly': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      // #endregion

      // #region sonarjs
      'sonarjs/cognitive-complexity': ['error', 25],
      // https://community.sonarsource.com/t/eslint-plugin-sonarjs-performance-issues-on-large-codebase/138392
      'sonarjs/no-commented-code': 'off',
      'sonarjs/no-duplicate-string': 'off',
      'sonarjs/no-nested-assignment': 'off',
      // #endregion

      // #region unicorn
      'unicorn/prefer-module': 'off',
      'unicorn/prefer-ternary': ['error', 'only-single-line'],
      'unicorn/prefer-top-level-await': 'off',
      // #endregion

      'vitest/expect-expect': ['error', { assertFunctionNames: ['expect', 'request.**.expect'] }],
    },
  },
);
