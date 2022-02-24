jest.mock('uuid');

import { DeepPartial } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { BaseEntityInsertCommandFixtures } from '../../fixtures/domain/command/BaseEntityInsertCommandFixtures';
import { BaseEntityInsertCommandTypeOrmFixtures } from '../../fixtures/integration/typeOrm/command/BaseEntityInsertCommandTypeOrmFixtures';
import { BaseEntityTypeOrm } from '../../integration/typeOrm/model/BaseEntityTypeOrm';
import { BaseEntityInsertCommand } from '../command/BaseEntityInsertCommand';
import { BaseEntityInsertCommandToBaseEntityInsertQueryTypeOrmConverterAsync } from './BaseEntityInsertCommandToBaseEntityInsertQueryTypeOrmConverterAsync';

class BaseEntityInsertCommandToBaseEntityInsertQueryTypeOrmConverterAsyncTest extends BaseEntityInsertCommandToBaseEntityInsertQueryTypeOrmConverterAsync<
  BaseEntityInsertCommand,
  DeepPartial<BaseEntityTypeOrm>
> {
  constructor(
    private readonly convertToEntityInsertQueryTypeOrmMock: jest.Mock<Promise<DeepPartial<BaseEntityTypeOrm>>>,
  ) {
    super();
  }

  protected async convertToEntityInsertQueryTypeOrm(
    input: BaseEntityInsertCommand,
    baseEntityFindQueryTypeOrm: DeepPartial<BaseEntityTypeOrm>,
  ): Promise<DeepPartial<BaseEntityTypeOrm>> {
    return this.convertToEntityInsertQueryTypeOrmMock(input, baseEntityFindQueryTypeOrm);
  }
}

describe(BaseEntityInsertCommandToBaseEntityInsertQueryTypeOrmConverterAsync.name, () => {
  let convertToEntityInsertQueryTypeOrmMock: jest.Mock<Promise<DeepPartial<BaseEntityTypeOrm>>>;

  let baseEntityInsertCommandToBaseEntityInsertQueryTypeOrmConverterAsyncTest: BaseEntityInsertCommandToBaseEntityInsertQueryTypeOrmConverterAsyncTest;

  beforeAll(() => {
    convertToEntityInsertQueryTypeOrmMock = jest.fn<Promise<DeepPartial<BaseEntityTypeOrm>>, unknown[]>();

    baseEntityInsertCommandToBaseEntityInsertQueryTypeOrmConverterAsyncTest =
      new BaseEntityInsertCommandToBaseEntityInsertQueryTypeOrmConverterAsyncTest(
        convertToEntityInsertQueryTypeOrmMock,
      );
  });

  describe('.convert()', () => {
    let baseEntityInsertCommandFixture: BaseEntityInsertCommand;

    beforeAll(() => {
      baseEntityInsertCommandFixture = BaseEntityInsertCommandFixtures.any;
    });

    describe('when called', () => {
      let baseEntityInsertQueryTypeOrm: DeepPartial<BaseEntityTypeOrm>;
      let result: unknown;

      beforeAll(async () => {
        baseEntityInsertQueryTypeOrm = BaseEntityInsertCommandTypeOrmFixtures.withCreatedAtAndIdAndUpdatedAt;

        jest.useFakeTimers();

        jest.setSystemTime(baseEntityInsertQueryTypeOrm.createdAt as Date);

        convertToEntityInsertQueryTypeOrmMock.mockImplementationOnce(
          async (
            _input: BaseEntityInsertCommand,
            baseEntityFindQueryTypeOrm: DeepPartial<BaseEntityTypeOrm>,
          ): Promise<DeepPartial<BaseEntityTypeOrm>> => baseEntityFindQueryTypeOrm,
        );

        (uuid as jest.Mock<string>).mockReturnValueOnce(baseEntityInsertQueryTypeOrm.id as string);

        result = await baseEntityInsertCommandToBaseEntityInsertQueryTypeOrmConverterAsyncTest.convert(
          baseEntityInsertCommandFixture,
        );
      });

      afterAll(() => {
        jest.useRealTimers();
        jest.clearAllMocks();
      });

      it('should call uuid', () => {
        expect(uuid).toHaveBeenCalledTimes(1);
        expect(uuid).toHaveBeenCalledWith();
      });

      it('should return a DeepPartial<BaseEntityTypeOrm>', () => {
        expect(result).toStrictEqual(baseEntityInsertQueryTypeOrm);
      });
    });
  });
});
