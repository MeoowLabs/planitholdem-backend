import { FindConditions } from 'typeorm';

import { BaseEntityFindQueryFixtures } from '../../fixtures/domain/query/BaseEntityFindQueryFixtures';
import { BaseEntityFindQueryTypeOrmFixtures } from '../../fixtures/integration/typeOrm/query/BaseEntityFindQueryTypeOrmFixtures';
import { BaseEntityTypeOrm } from '../../integration/typeOrm/model/BaseEntityTypeOrm';
import { BaseEntityFindQuery } from '../query/BaseEntityFindQuery';
import { BaseEntityFindQueryToBaseEntityFindQueryTypeOrmConverterAsync } from './BaseEntityFindQueryToBaseEntityFindQueryTypeOrmConverterAsync';

class BaseEntityFindQueryToBaseEntityFindQueryTypeOrmConverterAsyncTest extends BaseEntityFindQueryToBaseEntityFindQueryTypeOrmConverterAsync<
  BaseEntityFindQuery,
  FindConditions<BaseEntityTypeOrm>
> {
  constructor(
    private readonly convertToEntityFindQueryTypeOrmMock: jest.Mock<Promise<FindConditions<BaseEntityTypeOrm>>>,
  ) {
    super();
  }

  protected async convertToEntityFindQueryTypeOrm(
    input: BaseEntityFindQuery,
    baseEntityFindQueryTypeOrm: FindConditions<BaseEntityTypeOrm>,
  ): Promise<FindConditions<BaseEntityTypeOrm>> {
    return this.convertToEntityFindQueryTypeOrmMock(input, baseEntityFindQueryTypeOrm);
  }
}

describe(BaseEntityFindQueryToBaseEntityFindQueryTypeOrmConverterAsync.name, () => {
  let convertToEntityFindQueryTypeOrmMock: jest.Mock<Promise<FindConditions<BaseEntityTypeOrm>>>;
  let baseEntityFindQueryToBaseEntityFindQueryTypeOrmConverterAsync: BaseEntityFindQueryToBaseEntityFindQueryTypeOrmConverterAsyncTest;

  beforeAll(() => {
    convertToEntityFindQueryTypeOrmMock = jest.fn<Promise<FindConditions<BaseEntityTypeOrm>>, unknown[]>();

    baseEntityFindQueryToBaseEntityFindQueryTypeOrmConverterAsync =
      new BaseEntityFindQueryToBaseEntityFindQueryTypeOrmConverterAsyncTest(convertToEntityFindQueryTypeOrmMock);
  });

  describe('.convert()', () => {
    describe('having a baseEntityFindQuery with id', () => {
      let baseEntityFindQueryFixture: BaseEntityFindQuery;

      beforeAll(() => {
        baseEntityFindQueryFixture = BaseEntityFindQueryFixtures.withId;
      });

      describe('when called', () => {
        let result: unknown;

        let baseEntityFindQueryTypeOrmFixture: FindConditions<BaseEntityTypeOrm>;

        beforeAll(async () => {
          baseEntityFindQueryTypeOrmFixture = BaseEntityFindQueryTypeOrmFixtures.withId;

          convertToEntityFindQueryTypeOrmMock.mockResolvedValueOnce(baseEntityFindQueryTypeOrmFixture);

          result = await baseEntityFindQueryToBaseEntityFindQueryTypeOrmConverterAsync.convert(
            baseEntityFindQueryFixture,
          );
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should call convertToEntityFindQueryTypeOrm()', () => {
          expect(convertToEntityFindQueryTypeOrmMock).toHaveBeenCalledTimes(1);
          expect(convertToEntityFindQueryTypeOrmMock).toHaveBeenCalledWith(
            baseEntityFindQueryFixture,
            baseEntityFindQueryTypeOrmFixture,
          );
        });

        it('should return a FindConditions<BaseEntityTypeOrm>', () => {
          expect(result).toBe(baseEntityFindQueryTypeOrmFixture);
        });
      });
    });
  });
});
