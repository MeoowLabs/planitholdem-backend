import { Injectable } from '@nestjs/common';
import { ICommand, ICommandHandler } from '@nestjs/cqrs';

import { Manager } from '../../service/Manager';
import { ManagerAsync } from '../../service/ManagerAsync';

@Injectable()
export class DeleteCommandHandler<TModel, TCommand extends ICommand> implements ICommandHandler<TCommand> {
  constructor(private readonly deleteManager: Manager<TCommand, TModel> | ManagerAsync<TCommand, TModel>) {}

  public async execute(command: TCommand): Promise<TModel> {
    return this.deleteManager.manage(command);
  }
}
