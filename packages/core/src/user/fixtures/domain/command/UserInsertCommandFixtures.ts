import { UserInsertCommand } from '../../../domain/command/UserInsertCommand';
import { UserFixtures } from '../model/UserFixtures';

export class UserInsertCommandFixtures {
  public static get any(): UserInsertCommand {
    const fixture: UserInsertCommand = {
      email: UserFixtures.any.email,
      name: UserFixtures.any.name,
      password: UserFixtures.any.passwordHash,
      surname: UserFixtures.any.surname,
    };

    return fixture;
  }
}
