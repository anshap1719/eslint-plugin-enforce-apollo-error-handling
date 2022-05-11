import handleMutationError from './handleMutationError';
import handleQueryError from './handleQueryError';

const rules = {
    'handle-query-error': handleQueryError,
    'handle-mutation-error': handleMutationError,
};

export default rules;
