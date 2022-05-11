import { AST_NODE_TYPES } from '@typescript-eslint/utils';
import createRule from '../util/createRule';

const MUTATION_HOOK_PATTERN = /use(.*)Mutation/g;

const handleMutationError = createRule({
    name: 'handle-mutation-error',
    meta: {
        docs: {
            description: 'Error handling is important :)',
            recommended: 'warn',
        },
        messages: {
            general: 'Handle error returned from this mutation',
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

                if (!node.init.callee.name.match(MUTATION_HOOK_PATTERN)) {
                    return;
                }

                if (node.id.type !== AST_NODE_TYPES.ArrayPattern) {
                    return;
                }

                const objectElement = node.id.elements[1];

                if (
                    !objectElement ||
                    objectElement.type !== AST_NODE_TYPES.ObjectPattern
                ) {
                    context.report({
                        node,
                        messageId: 'general',
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
                        messageId: 'general',
                    });
                }
            },
        };
    },
});

export default handleMutationError;
