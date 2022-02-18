import { FindConditions } from 'typeorm';

import { UserFindQuery } from '../../../domain/query/UserFindQuery';
import { UserFindQueryFixtures } from '../../../fixtures/domain/query/UserFindQueryFixtures';
import { UserFindQueryTypeOrmFixtures } from '../../../fixtures/integration/typeOrm/UserFindQueryTypeOrmFixtures';
import { UserTypeOrm } from '../model/UserTypeOrm';
import { UserFindQueryToUserFindQueryTypeOrmConverter } from './UserFindQueryToUserFindQueryTypeOrmConverter';

describe(UserFindQueryToUserFindQueryTypeOrmConverter.name, () => {
  let userFindQueryToUserFindQueryTypeOrmConverter: UserFindQueryToUserFindQueryTypeOrmConverter;

  beforeAll(() => {
    userFindQueryToUserFindQueryTypeOrmConverter = new UserFindQueryToUserFindQueryTypeOrmConverter();
  });

  describe('.convert()', () => {
    describe('having a UserFindQuery with id', () => {
      let userFindQueryFixture: UserFindQuery;
      let userFindQueryTypeOrmFixture: FindConditions<UserTypeOrm>;

      beforeAll(() => {
        userFindQueryFixture = UserFindQueryFixtures.withId;
        userFindQueryTypeOrmFixture = UserFindQueryTypeOrmFixtures.withId;
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(() => {
          result = userFindQueryToUserFindQueryTypeOrmConverter.convert(userFindQueryFixture);
        });

        it('should return a FindConditions<UserTypeOrm>', () => {
          expect(result).toStrictEqual(userFindQueryTypeOrmFixture);
        });
      });
    });

    describe('having a UserFindQuery with email', () => {
      let userFindQueryFixture: UserFindQuery;
      let userFindQueryTypeOrmFixture: FindConditions<UserTypeOrm>;

      beforeAll(() => {
        userFindQueryFixture = UserFindQueryFixtures.withEmail;
        userFindQueryTypeOrmFixture = UserFindQueryTypeOrmFixtures.withEmail;
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(() => {
          result = userFindQueryToUserFindQueryTypeOrmConverter.convert(userFindQueryFixture);
        });

        it('should return a FindConditions<UserTypeOrm>', () => {
          expect(result).toStrictEqual(userFindQueryTypeOrmFixture);
        });
      });
    });
  });
});
