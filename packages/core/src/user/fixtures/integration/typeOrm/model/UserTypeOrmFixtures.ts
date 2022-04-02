import { UserTypeOrm } from '../../../../integration/typeOrm/model/UserTypeOrm';
import { UserFixtures } from '../../../domain/model/UserFixtures';

export class UserTypeOrmFixtures {
  public static get any(): UserTypeOrm {
    const userTypeOrm: UserTypeOrm = new UserTypeOrm();

    userTypeOrm.id = UserFixtures.any.id;
    userTypeOrm.createdAt = UserFixtures.any.createdAt;
    userTypeOrm.updatedAt = UserFixtures.any.updatedAt;
    userTypeOrm.email = UserFixtures.any.email;
    userTypeOrm.name = UserFixtures.any.name;
    userTypeOrm.surname = UserFixtures.any.surname;
    userTypeOrm.passwordHash = UserFixtures.any.passwordHash;

    return userTypeOrm;
  }
}
