import { DeepPartial } from 'typeorm';

import { UserTypeOrm } from '../../../integration/typeOrm/model/UserTypeOrm';
import { UserFixtures } from '../../domain/model/UserFixtures';

export class UserInsertQueryTypeOrmFixtures {
  public static get any(): DeepPartial<UserTypeOrm> {
    return {
      createdAt: UserFixtures.any.createdAt,
      email: UserFixtures.any.email,
      id: UserFixtures.any.id,
      name: UserFixtures.any.name,
      passwordHash: UserFixtures.any.passwordHash,
      surname: UserFixtures.any.surname,
      updatedAt: UserFixtures.any.updatedAt,
    };
  }
}
