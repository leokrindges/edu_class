// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

// Plugins extras
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import eslintPluginImport from 'eslint-plugin-import';

// Prettier SEM conflito – sempre por último
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  // Ignorados gerais
  {
    ignores: ['node_modules', 'dist', 'coverage'],
  },

  // JS solto (se houver)
  {
    files: ['**/*.{js,cjs,mjs}'],
    ...eslint.configs.recommended,
    languageOptions: {
      sourceType: 'module',
      globals: { ...globals.node },
    },
  },

  // TypeScript (type-aware)
  {
    files: ['**/*.{ts,tsx}'],
    // presets recomendados do TS (type-checked)
    ...tseslint.configs.recommendedTypeChecked.reduce((acc, cfg) => ({ ...acc, ...cfg }), {}),
    languageOptions: {
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: { ...globals.node },
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
      import: eslintPluginImport,
    },
    settings: {
      'import/resolver': { typescript: true },
    },
    rules: {
      // Robustez
      '@typescript-eslint/no-misused-promises': ['warn', { checksVoidReturn: { attributes: false } }],
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      '@typescript-eslint/require-array-sort-compare': ['warn', { ignoreStringArrays: true }],
      '@typescript-eslint/strict-boolean-expressions': ['warn', {
        allowNullableObject: true,
        allowNullableBoolean: true,
        allowNullableString: true,
        allowNumber: true,
      }],

      // Qualidade
      '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports', fixStyle: 'inline-type-imports' }],
      '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
      '@typescript-eslint/prefer-nullish-coalescing': ['warn', { ignoreMixedLogicalExpressions: true }],
      '@typescript-eslint/prefer-optional-chain': 'warn',
      '@typescript-eslint/no-useless-empty-export': 'warn',

      // Ruído controlado
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/no-shadow': 'warn',
      '@typescript-eslint/ban-ts-comment': ['warn', { 'ts-expect-error': 'allow-with-description' }],
      '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true, allowHigherOrderFunctions: true }],

      // Imports
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      'unused-imports/no-unused-imports': 'warn',
      'import/no-duplicates': 'warn',
      'import/first': 'warn',
      'import/newline-after-import': 'warn',
      'import/no-mutable-exports': 'warn',
      'import/order': ['warn', { 'newlines-between': 'always' }],
    },
  },

  // Arquivos de teste (Jest) — globals só aqui
  {
    files: ['**/*.{spec,test}.{ts,tsx,js}'],
    languageOptions: {
      globals: { ...globals.jest },
    },
  },

  // Prettier no final
  eslintPluginPrettierRecommended
);
