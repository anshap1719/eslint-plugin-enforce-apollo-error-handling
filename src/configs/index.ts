import { SharedConfigurationSettings } from '@typescript-eslint/utils/dist/ts-eslint';
import recommended from './recommended';
import strict from './strict';

const configs: SharedConfigurationSettings = {
    recommended,
    strict,
};

export default configs;
