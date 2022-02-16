import { Injectable } from '@nestjs/common';

import { DeleteAdapter } from './DeleteAdapter';
import { ManagerAsync } from './ManagerAsync';

@Injectable()
export class DeleteManager<TCommand> implements ManagerAsync<TCommand, void> {
  constructor(private readonly deleteAdapter: DeleteAdapter<TCommand>) {}

  public async manage(command: TCommand): Promise<void> {
    await this.deleteAdapter.delete(command);
  }
}
