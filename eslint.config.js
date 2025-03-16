import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';
const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default ts.config(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommendedTypeChecked,
	...ts.configs.strictTypeChecked,
	...ts.configs.stylisticTypeChecked,
	...svelte.configs.recommended,
	prettier,
	...svelte.configs['flat/prettier'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		ignores: ['eslint.config.js', 'svelte.config.js'],

		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser,
				svelteConfig,
				tsconfigRootDir: import.meta.dirname
			}
		}
	},
	{
		rules: {
			// General JavaScript/TypeScript rules:
			'no-console': 'warn', // Warn on console usage
			'prefer-const': 'error', // Enforce const usage when variables are not reassigned
			semi: ['error', 'always'], // Enforce semicolons
			quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }], // Prefer single quotes
			'sort-imports': [
				'error',
				{
					ignoreCase: true,
					ignoreDeclarationSort: true,
					allowSeparatedGroups: true
				}
			],

			// TypeScript-specific rules to enforce explicit typing (C#‑like):
			'@typescript-eslint/explicit-function-return-type': [
				'error',
				{
					allowExpressions: false, // Disallow omitting return type on function expressions
					allowTypedFunctionExpressions: true
				}
			],
			'@typescript-eslint/explicit-module-boundary-types': 'error',
			'@typescript-eslint/typedef': [
				'error',
				{
					arrowParameter: false,
					memberVariableDeclaration: true,
					objectDestructuring: true,
					parameter: true,
					propertyDeclaration: true,
					variableDeclaration: true
				}
			],
			'@typescript-eslint/explicit-member-accessibility': [
				'error',
				{
					accessibility: 'explicit' // Require public/private/protected on class members
				}
			],
			'@typescript-eslint/no-explicit-any': 'error', // Prevent fallback to any

			// Enforce consistent type definitions (use interfaces, like in C#)
			'@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

			// Svelte-specific best practices:
			'svelte/no-at-debug-tags': 'error', // Disallow {@debug} tags
			'svelte/no-reactive-functions': 'error', // Prevent functions defined inside reactive blocks
			'svelte/no-reactive-literals': 'error', // Avoid literal assignments in reactive statements
			'svelte/no-target-blank': 'error', // Prevent security issues with target="_blank"
			'svelte/require-each-key': 'error', // Enforce key attribute in each blocks for proper reactivity
			'svelte/prefer-const': 'error', // Enforce const for values that are never reassigned
			'svelte/no-unused-svelte-ignore': 'error', // Disallow unused svelte-ignore comments
			'svelte/button-has-type': 'error', // Require button elements to have an explicit type attribute
			'svelte/no-inline-styles': 'warn', // Warn against inline styles to encourage separation of concerns
			'svelte/consistent-selector-style': ['warn', 'lowercase'] // Enforce a consistent, lowercase style for CSS selectors
		}
	}
);
