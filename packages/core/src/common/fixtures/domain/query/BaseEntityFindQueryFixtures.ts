import { BaseEntityFindQuery } from '../../../domain/query/BaseEntityFindQuery';
import { BaseEntityFixtures } from '../model/BaseEntityFixtures';

export class BaseEntityFindQueryFixtures {
  public static get any(): BaseEntityFindQuery {
    return {};
  }

  public static get withId(): BaseEntityFindQuery {
    return { ...BaseEntityFindQueryFixtures.any, id: BaseEntityFixtures.any.id };
  }
}
