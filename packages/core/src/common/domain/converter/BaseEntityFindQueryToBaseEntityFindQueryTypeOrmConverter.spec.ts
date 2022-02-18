import { FindConditions } from 'typeorm';

import { BaseEntityFindQueryFixtures } from '../../fixtures/domain/query/BaseEntityFindQueryFixtures';
import { BaseEntityFindQueryTypeOrmFixtures } from '../../fixtures/integration/typeOrm/BaseEntityFindQueryTypeOrmFixtures';
import { BaseEntityTypeOrm } from '../../integration/typeOrm/model/BaseEntityTypeOrm';
import { BaseEntityFindQuery } from '../query/BaseEntityFindQuery';
import { BaseEntityFindQueryToBaseEntityFindQueryTypeOrmConverter } from './BaseEntityFindQueryToBaseEntityFindQueryTypeOrmConverter';

describe(BaseEntityFindQueryToBaseEntityFindQueryTypeOrmConverter.name, () => {
  let baseEntityFindQueryToBaseEntityFindQueryTypeOrmConverter: BaseEntityFindQueryToBaseEntityFindQueryTypeOrmConverter<
    BaseEntityFindQuery,
    BaseEntityTypeOrm
  >;

  beforeAll(() => {
    baseEntityFindQueryToBaseEntityFindQueryTypeOrmConverter =
      new BaseEntityFindQueryToBaseEntityFindQueryTypeOrmConverter();
  });

  describe('.convert()', () => {
    describe('having a BaseEntityFindQuery with id', () => {
      let baseEntityFindQueryFixture: BaseEntityFindQuery;
      let baseEntityFindQueryTypeOrmFixture: FindConditions<BaseEntityTypeOrm>;

      beforeAll(() => {
        baseEntityFindQueryFixture = BaseEntityFindQueryFixtures.withId;
        baseEntityFindQueryTypeOrmFixture = BaseEntityFindQueryTypeOrmFixtures.withId;
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(() => {
          result = baseEntityFindQueryToBaseEntityFindQueryTypeOrmConverter.convert(baseEntityFindQueryFixture);
        });

        it('should return a FindConditions<BaseEntityTypeOrm>', () => {
          expect(result).toStrictEqual(baseEntityFindQueryTypeOrmFixture);
        });
      });
    });
  });
});
