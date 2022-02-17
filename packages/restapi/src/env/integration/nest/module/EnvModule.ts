import { Module } from '@nestjs/common';

import { LoadEnvVariablesDotenvAdapter } from '../../core/adapter/LoadEnvVariablesDotenvAdapter';

@Module({
  exports: [LoadEnvVariablesDotenvAdapter],
  providers: [LoadEnvVariablesDotenvAdapter],
})
export class EnvModule {}
