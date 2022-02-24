import { Injectable } from '@nestjs/common';
import { ICommand, ICommandHandler } from '@nestjs/cqrs';

import { Manager } from '../../domain/service/Manager';
import { ManagerAsync } from '../../domain/service/ManagerAsync';

@Injectable()
export class InsertOneCommandHandler<TCommand extends ICommand, TModel> implements ICommandHandler<TCommand, TModel> {
  public constructor(private readonly insertOneManager: Manager<TCommand, TModel> | ManagerAsync<TCommand, TModel>) {}

  public async execute(command: TCommand): Promise<TModel> {
    return this.insertOneManager.manage(command);
  }
}
