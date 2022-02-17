import { Module } from '@nestjs/common';

import { EnvModule } from '../../../../env/integration/nest/module/EnvModule';
import { AppConfig } from '../../../domain/config/AppConfig';
import { AppController } from '../controller/AppController';

@Module({
  controllers: [AppController],
  imports: [EnvModule],
  providers: [AppConfig],
})
export class AppModule {}
