export = {
    parser: '@typescript-eslint/parser',
    parserOptions: { sourceType: 'module' },
    rules: {
        '@anshulsanghi/enforce-apollo-error-handling/handle-query-error':
            'error',
        '@anshulsanghi/enforce-apollo-error-handling/handle-mutation-error':
            'error',
    },
};
