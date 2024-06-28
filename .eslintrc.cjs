module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react-hooks/recommended', 'plugin:@typescript-eslint/recommended'],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    rules: {
        'react/jsx-newline': ['error', { prevent: true, allowMultilines: true }],
        'react/react-in-jsx-scope': ['off'],
        'react-hooks/exhaustive-deps': ['off'],
        '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
    }
}
