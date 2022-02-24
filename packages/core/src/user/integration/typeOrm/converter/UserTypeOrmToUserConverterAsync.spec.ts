import { User } from '../../../domain/model/User';
import { UserFixtures } from '../../../fixtures/domain/model/UserFixtures';
import { UserTypeOrmFixtures } from '../../../fixtures/integration/typeOrm/model/UserTypeOrmFixtures';
import { UserTypeOrm } from '../model/UserTypeOrm';
import { UserTypeOrmToUserConverterAsync } from './UserTypeOrmToUserConverterAsync';

describe(UserTypeOrmToUserConverterAsync.name, () => {
  let userTypeOrmToUserConverterAsync: UserTypeOrmToUserConverterAsync;

  beforeAll(() => {
    userTypeOrmToUserConverterAsync = new UserTypeOrmToUserConverterAsync();
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let userFixture: User;
      let userTypeOrmFixture: UserTypeOrm;
      let result: unknown;

      beforeAll(async () => {
        userFixture = UserFixtures.any;
        userTypeOrmFixture = UserTypeOrmFixtures.any;

        result = await userTypeOrmToUserConverterAsync.convert(userTypeOrmFixture);
      });

      it('should return User', () => {
        expect(result).toStrictEqual(userFixture);
      });
    });
  });
});
