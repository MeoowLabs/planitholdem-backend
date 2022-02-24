import { BaseEntityInsertCommand } from '../../../domain/command/BaseEntityInsertCommand';

export class BaseEntityInsertCommandFixtures {
  public static get any(): BaseEntityInsertCommand {
    const fixture: BaseEntityInsertCommand = new BaseEntityInsertCommand();

    return fixture;
  }
}
