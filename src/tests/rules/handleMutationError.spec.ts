import { RuleTester } from '@typescript-eslint/utils/dist/ts-eslint';
import handleMutationError from '../../rules/handleMutationError';

const ruleTester = new RuleTester({
    parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run('handle-mutation-error', handleMutationError, {
    valid: [
        {
            code: `const [runMutation, { error, loading }] = useMutation<CheckoutQueryResultData>(
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
    ],
    invalid: [
        {
            code: `const [runMutation, { loading }] = useMutation<CheckoutQueryResultData>(
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
            code: `const [runMutation] = useMutation<CheckoutQueryResultData>(
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
    ],
});
