import path from 'path';

import { LoadDataDotenvAdapter } from '@meoowlabs/planitholdem-core';
import { Injectable } from '@nestjs/common';

import { EnvVariables } from '../../../domain/model/EnvVariables';
import { envVariablesToEnvVariablesValidatorEnvalidMap } from '../../envalid/model/envVariablesToEnvVariablesValidatorEnvalidMap';

@Injectable()
export class LoadEnvVariablesDotenvAdapter extends LoadDataDotenvAdapter<EnvVariables> {
  private static readonly ENV_VARIABLES_DOTENV_DEFAULT_FILE_NAME: string = '';

  public constructor() {
    super(envVariablesToEnvVariablesValidatorEnvalidMap, LoadEnvVariablesDotenvAdapter.getEnvFilepath());
  }

  private static getEnvFilepath(): string {
    const dotenvName: string =
      process.env['ENV'] ?? LoadEnvVariablesDotenvAdapter.ENV_VARIABLES_DOTENV_DEFAULT_FILE_NAME;

    const envFilepath: string = path.resolve(__dirname, '..', '..', '..', '..', '..', 'config', `${dotenvName}.env`);

    return envFilepath;
  }
}
