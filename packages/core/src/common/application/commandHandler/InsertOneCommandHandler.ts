import { Injectable } from '@nestjs/common';
import { ICommand, ICommandHandler } from '@nestjs/cqrs';

import { Converter } from '../../../common/domain/converter/Converter';
import { ConverterAsync } from '../../../common/domain/converter/ConverterAsync';
import { Manager } from '../../domain/service/Manager';
import { ManagerAsync } from '../../domain/service/ManagerAsync';

@Injectable()
export class InsertOneCommandHandler<TAppCommand extends ICommand, TDomainCommand, TModel>
  implements ICommandHandler<TAppCommand, TModel>
{
  public constructor(
    private readonly applicationCommandToDomainCommandConverter:
      | Converter<TAppCommand, TDomainCommand>
      | ConverterAsync<TAppCommand, TDomainCommand>,
    private readonly insertOneManager: Manager<TDomainCommand, TModel> | ManagerAsync<TDomainCommand, TModel>,
  ) {}

  public async execute(applicationCommand: TAppCommand): Promise<TModel> {
    const domainCommand: TDomainCommand = await this.applicationCommandToDomainCommandConverter.convert(
      applicationCommand,
    );

    return this.insertOneManager.manage(domainCommand);
  }
}
