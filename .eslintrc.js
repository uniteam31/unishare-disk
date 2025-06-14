module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:@conarti/feature-sliced/recommended',
	],
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', 'react'],
	rules: {
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'react/react-in-jsx-scope': 'off',
		'no-unused-vars': 'warn',
		'object-curly-spacing': ['error', 'always'],
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'error',
		'react/display-name': 'off',
		'react/prop-types': 'off',
		'@typescript-eslint/no-explicit-any': 'warn',
	},
};
