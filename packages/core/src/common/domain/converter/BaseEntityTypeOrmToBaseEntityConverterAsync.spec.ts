import { BaseEntityFixtures } from '../../fixtures/domain/model/BaseEntityFixtures';
import { BaseEntityTypeOrmFixtures } from '../../fixtures/integration/typeOrm/model/BaseEntityTypeOrmFixtures';
import { BaseEntityTypeOrm } from '../../integration/typeOrm/model/BaseEntityTypeOrm';
import { BaseEntity } from '../model/BaseEntity';
import { BaseEntityTypeOrmToBaseEntityConverterAsync } from './BaseEntityTypeOrmToBaseEntityConverterAsync';

class BaseEntityTypeOrmToBaseEntityConverterAsyncTest extends BaseEntityTypeOrmToBaseEntityConverterAsync<
  BaseEntityTypeOrm,
  BaseEntity
> {
  constructor(private readonly convertToBaseEntityTypeOrmMock: jest.Mock<Promise<BaseEntity>>) {
    super();
  }

  protected async convertToEntity(input: BaseEntityTypeOrm, baseEntity: BaseEntity): Promise<BaseEntity> {
    return this.convertToBaseEntityTypeOrmMock(input, baseEntity);
  }
}

describe(BaseEntityTypeOrmToBaseEntityConverterAsync.name, () => {
  let baseEntityTypeOrmToBaseEntityConverterAsyncTest: BaseEntityTypeOrmToBaseEntityConverterAsyncTest;
  let convertToBaseEntityTypeOrmMock: jest.Mock<Promise<BaseEntity>>;

  beforeAll(() => {
    convertToBaseEntityTypeOrmMock = jest.fn<Promise<BaseEntity>, unknown[]>();
    baseEntityTypeOrmToBaseEntityConverterAsyncTest = new BaseEntityTypeOrmToBaseEntityConverterAsyncTest(
      convertToBaseEntityTypeOrmMock,
    );
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let baseEntityTypeOrmFixture: BaseEntityTypeOrm;
      let baseEntityFixture: BaseEntity;
      let result: unknown;

      beforeAll(async () => {
        baseEntityFixture = BaseEntityFixtures.any;
        baseEntityTypeOrmFixture = BaseEntityTypeOrmFixtures.any;

        convertToBaseEntityTypeOrmMock.mockResolvedValueOnce(baseEntityFixture);

        result = await baseEntityTypeOrmToBaseEntityConverterAsyncTest.convert(baseEntityFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call convertToBaseEntityTypeOrmMock()', () => {
        expect(convertToBaseEntityTypeOrmMock).toHaveBeenCalledTimes(1);
        expect(convertToBaseEntityTypeOrmMock).toHaveBeenCalledWith(baseEntityTypeOrmFixture, baseEntityFixture);
      });

      it('should return BaseEntityTypeOrm', () => {
        expect(result).toBe(baseEntityFixture);
      });
    });
  });
});
