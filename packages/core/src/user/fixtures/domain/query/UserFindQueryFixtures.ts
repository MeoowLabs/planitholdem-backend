import { UserFindQuery } from '../../../domain/query/UserFindQuery';
import { UserFixtures } from '../model/UserFixtures';

export class UserFindQueryFixtures {
  public static get any(): UserFindQuery {
    return new UserFindQuery(UserFixtures.any.id, undefined);
  }

  public static get withId(): UserFindQuery {
    return new UserFindQuery(UserFixtures.any.id, undefined);
  }

  public static get withEmail(): UserFindQuery {
    return new UserFindQuery(undefined, UserFixtures.any.email);
  }
}
