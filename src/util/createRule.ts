import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
    // TODO: Replace with actual documentation
    name => `https://example.com/rule/${name}`
);

export default createRule;
