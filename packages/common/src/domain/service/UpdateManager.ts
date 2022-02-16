import { Injectable } from '@nestjs/common';

import { ManagerAsync } from './ManagerAsync';
import { UpdateAdapter } from './UpdateAdapter';

@Injectable()
export class UpdateManager<TCommand> implements ManagerAsync<TCommand, void> {
  constructor(private readonly updateAdapter: UpdateAdapter<TCommand>) {}

  public async manage(command: TCommand): Promise<void> {
    await this.updateAdapter.update(command);
  }
}
