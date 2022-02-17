import { LoadDataAdapter } from '@meoowlabs/planitholdem-core';
import { Inject, Injectable } from '@nestjs/common';

import { EnvVariables } from '../../../env/domain/model/EnvVariables';
import { LoadEnvVariablesDotenvAdapter } from '../../../env/integration/core/adapter/LoadEnvVariablesDotenvAdapter';

@Injectable()
export class AppConfig {
  public readonly host: string;
  public readonly port: number;

  constructor(@Inject(LoadEnvVariablesDotenvAdapter) loadEnvVariablesAdapter: LoadDataAdapter<EnvVariables>) {
    const envVariables: EnvVariables = loadEnvVariablesAdapter.loadData();

    this.host = envVariables.HTTP_SERVER_HOST;
    this.port = envVariables.HTTP_SERVER_PORT;
  }
}
