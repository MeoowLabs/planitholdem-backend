import { Injectable } from '@nestjs/common';
import { IQuery, IQueryHandler } from '@nestjs/cqrs';

import { Manager } from '../../service/Manager';
import { ManagerAsync } from '../../service/ManagerAsync';

@Injectable()
export class FindOneQueryHandler<TQuery extends IQuery, TModel> implements IQueryHandler<TQuery, TModel | undefined> {
  constructor(
    private readonly findOneManager: Manager<TQuery, TModel | undefined> | ManagerAsync<TQuery, TModel | undefined>,
  ) {}

  public async execute(query: TQuery): Promise<TModel | undefined> {
    const modelOrUndefined: TModel | undefined = await this.findOneManager.manage(query);

    return modelOrUndefined;
  }
}
