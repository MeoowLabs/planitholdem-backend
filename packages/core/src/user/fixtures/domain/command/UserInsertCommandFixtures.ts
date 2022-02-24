import { UserInsertCommand } from '../../../domain/command/UserInsertCommand';
import { UserFixtures } from '../model/UserFixtures';

export class UserInsertCommandFixtures {
  public static get any(): UserInsertCommand {
    return new UserInsertCommand(
      UserFixtures.any.name,
      UserFixtures.any.surname,
      UserFixtures.any.email,
      UserFixtures.any.passwordHash,
    );
  }
}
