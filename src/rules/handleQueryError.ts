import { AST_NODE_TYPES } from '@typescript-eslint/utils';
import createRule from '../util/createRule';

const QUERY_HOOK_PATTERN = /use(.*)Query/g;

const handleQueryError = createRule({
    name: 'handle-query-error',
    meta: {
        docs: {
            description: 'Error handling is important :)',
            recommended: 'warn',
        },
        messages: {
            general: 'Handle error returned from this query',
            lazyQuery: 'Handle error returned from this lazy query',
        },
        type: 'problem',
        schema: [],
    },
    defaultOptions: [{ parser: '@typescript-eslint/parser' }],
    create(context) {
        return {
            VariableDeclarator(node) {
                if (node.init?.type !== AST_NODE_TYPES.CallExpression) {
                    return;
                }

                if (node.init.callee.type !== AST_NODE_TYPES.Identifier) {
                    return;
                }

                if (!node.init.callee.name.match(QUERY_HOOK_PATTERN)) {
                    return;
                }

                if (node.id.type === AST_NODE_TYPES.ObjectPattern) {
                    if (
                        !node.id.properties.some(property => {
                            if (
                                property.type !== AST_NODE_TYPES.Property ||
                                property.key.type !== AST_NODE_TYPES.Identifier
                            ) {
                                return false;
                            }

                            return (
                                property.key.name === 'error' ||
                                property.key.name === 'errors'
                            );
                        })
                    ) {
                        context.report({
                            node,
                            messageId: 'general',
                        });
                    }
                } else if (node.id.type === AST_NODE_TYPES.ArrayPattern) {
                    const objectElement = node.id.elements[1];

                    if (
                        !objectElement ||
                        objectElement.type !== AST_NODE_TYPES.ObjectPattern
                    ) {
                        context.report({
                            node,
                            messageId: 'lazyQuery',
                        });
                        return;
                    }

                    if (
                        !objectElement.properties.some(property => {
                            if (
                                property.type !== AST_NODE_TYPES.Property ||
                                property.key.type !== AST_NODE_TYPES.Identifier
                            ) {
                                return false;
                            }

                            return (
                                property.key.name === 'error' ||
                                property.key.name === 'errors'
                            );
                        })
                    ) {
                        context.report({
                            node,
                            messageId: 'lazyQuery',
                        });
                    }
                }
            },
        };
    },
});

export default handleQueryError;
