/** @type { import("eslint").Linter.FlatConfig } */
module.exports = {
	root: true,
	extends: ['plugin:svelte/recommended', '@besties'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2022,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser'
		}
	],
	rules: {
		'svelte/block-lang': [
			'error',
			{
				style: 'postcss'
			}
		],
		'no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
	}
}
