import { Injectable } from '@nestjs/common';
import { ICommand, ICommandHandler } from '@nestjs/cqrs';

import { Manager } from '../../domain/service/Manager';
import { ManagerAsync } from '../../domain/service/ManagerAsync';

@Injectable()
export class DeleteCommandHandler<TModel, TCommand extends ICommand> implements ICommandHandler<TCommand> {
  public constructor(private readonly deleteManager: Manager<TCommand, TModel> | ManagerAsync<TCommand, TModel>) {}

  public async execute(command: TCommand): Promise<TModel> {
    return this.deleteManager.manage(command);
  }
}
