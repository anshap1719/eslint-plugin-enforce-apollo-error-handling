export = {
    parser: '@typescript-eslint/parser',
    parserOptions: { sourceType: 'module' },
    rules: {
        '@anshulsanghi/enforce-apollo-error-handling/handle-query-error':
            'warn',
        '@anshulsanghi/enforce-apollo-error-handling/handle-mutation-error':
            'warn',
    },
};
