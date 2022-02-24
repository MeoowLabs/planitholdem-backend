import { BaseEntityInsertCommand } from '../../../common/domain/command/BaseEntityInsertCommand';

export class UserInsertCommand extends BaseEntityInsertCommand {
  public constructor(
    public readonly name: string,
    public readonly surname: string,
    public readonly email: string,
    public readonly password: string,
  ) {
    super();
  }
}
