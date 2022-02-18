import { BaseEntityFindQuery } from '../../../domain/query/BaseEntityFindQuery';
import { BaseEntityFixtures } from '../model/BaseEntityFixtures';

export class BaseEntityFindQueryFixtures {
  public static get any(): BaseEntityFindQuery {
    return new BaseEntityFindQuery(BaseEntityFixtures.any.id);
  }

  public static get withId(): BaseEntityFindQuery {
    return new BaseEntityFindQuery(BaseEntityFixtures.any.id);
  }
}
