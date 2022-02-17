import * as envalid from 'envalid';

import { EnvVariables } from '../../../domain/model/EnvVariables';

export const envVariablesToEnvVariablesValidatorEnvalidMap: {
  [TKey in keyof EnvVariables]: envalid.ValidatorSpec<EnvVariables[TKey]>;
} = {
  HTTP_SERVER_HOST: envalid.host(),
  HTTP_SERVER_PORT: envalid.port(),
};
