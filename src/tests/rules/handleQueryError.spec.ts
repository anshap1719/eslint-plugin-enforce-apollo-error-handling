import { RuleTester } from '@typescript-eslint/utils/dist/ts-eslint';
import handleQueryError from '../../rules/handleQueryError';

const ruleTester = new RuleTester({
    parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run('handle-query-error', handleQueryError, {
    valid: [
        {
            code: `const { data, error, loading } = useQuery<CheckoutQueryResultData>(
                    checkoutQuery,
                    {
                        variables: {
                            store,
                            language,
                            cartType,
                        },
                        pollInterval: 30_000,
                        fetchPolicy: 'network-only',
                        notifyOnNetworkStatusChange: true,
                        onCompleted: () => {
                            onCompleted();
                            if (!initialized) {
                                setInitialized(true);
                            }
                        },
                    }
                );
            `,
        },
        {
            code: `const [runQuery, { error, loading }] = useLazyQuery<CheckoutQueryResultData>(
                    checkoutQuery,
                    {
                        variables: {
                            store,
                            language,
                            cartType,
                        },
                        pollInterval: 30_000,
                        fetchPolicy: 'network-only',
                        notifyOnNetworkStatusChange: true,
                        onCompleted: () => {
                            onCompleted();
                            if (!initialized) {
                                setInitialized(true);
                            }
                        },
                    }
                );
            `,
        },
        {
            code: `const { data, loading } = useProductsQueryFilters<CheckoutQueryResultData>(
                    checkoutQuery,
                    {
                        variables: {
                            store,
                            language,
                            cartType,
                        },
                        pollInterval: 30_000,
                        fetchPolicy: 'network-only',
                        notifyOnNetworkStatusChange: true,
                        onCompleted: () => {
                            onCompleted();
                            if (!initialized) {
                                setInitialized(true);
                            }
                        },
                    }
                );
            `,
        },
        {
            code: `const { data, loading } = useQuery<CheckoutQueryResultData>(
                    checkoutQuery,
                    {
                        variables: {
                            store,
                            language,
                            cartType,
                        },
                        pollInterval: 30_000,
                        fetchPolicy: 'network-only',
                        notifyOnNetworkStatusChange: true,
                        onCompleted: () => {
                            onCompleted();
                            if (!initialized) {
                                setInitialized(true);
                            }
                        },
                    }
                );
            `,
            options: [{ ignoreHooks: ['useQuery'] }],
        },
    ],
    invalid: [
        {
            code: `const { data, loading } = useQuery<CheckoutQueryResultData>(
                    checkoutQuery,
                    {
                        variables: {
                            store,
                            language,
                            cartType,
                        },
                        pollInterval: 30_000,
                        fetchPolicy: 'network-only',
                        notifyOnNetworkStatusChange: true,
                        onCompleted: () => {
                            onCompleted();
                            if (!initialized) {
                                setInitialized(true);
                            }
                        },
                    }
                );
            `,
            errors: [{ messageId: 'general' }],
        },
        {
            code: `const [runQuery, { loading }] = useLazyQuery<CheckoutQueryResultData>(
                    checkoutQuery,
                    {
                        variables: {
                            store,
                            language,
                            cartType,
                        },
                        pollInterval: 30_000,
                        fetchPolicy: 'network-only',
                        notifyOnNetworkStatusChange: true,
                        onCompleted: () => {
                            onCompleted();
                            if (!initialized) {
                                setInitialized(true);
                            }
                        },
                    }
                );
            `,
            errors: [{ messageId: 'lazyQuery' }],
        },
        {
            code: `const [runQuery] = useLazyQuery<CheckoutQueryResultData>(
                    checkoutQuery,
                    {
                        variables: {
                            store,
                            language,
                            cartType,
                        },
                        pollInterval: 30_000,
                        fetchPolicy: 'network-only',
                        notifyOnNetworkStatusChange: true,
                        onCompleted: () => {
                            onCompleted();
                            if (!initialized) {
                                setInitialized(true);
                            }
                        },
                    }
                );
            `,
            errors: [{ messageId: 'lazyQuery' }],
        },
    ],
});
