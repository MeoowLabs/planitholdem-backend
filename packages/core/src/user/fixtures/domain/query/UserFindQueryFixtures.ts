import { UserFindQuery } from '../../../domain/query/UserFindQuery';
import { UserFixtures } from '../model/UserFixtures';

export class UserFindQueryFixtures {
  public static get any(): UserFindQuery {
    const fixture: UserFindQuery = {
      ...UserFixtures.any,
    };

    return fixture;
  }

  public static get withId(): UserFindQuery {
    const fixture: UserFindQuery = {
      id: UserFixtures.any.id,
    };

    return fixture;
  }

  public static get withEmail(): UserFindQuery {
    const fixture: UserFindQuery = {
      email: UserFixtures.any.email,
    };

    return fixture;
  }
}
