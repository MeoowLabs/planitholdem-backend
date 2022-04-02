import { FindConditions } from 'typeorm';

import { UserTypeOrm } from '../../../integration/typeOrm/model/UserTypeOrm';
import { UserFixtures } from '../../domain/model/UserFixtures';

export class UserFindQueryTypeOrmFixtures {
  public static get withId(): FindConditions<UserTypeOrm> {
    return {
      id: UserFixtures.any.id,
    };
  }

  public static get withEmail(): FindConditions<UserTypeOrm> {
    return {
      email: UserFixtures.any.email,
    };
  }
}
