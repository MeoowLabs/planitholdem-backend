import { Converter } from '../../../common/domain/converter/Converter';
import { ManagerAsync } from '../../domain/service/ManagerAsync';
import { InsertOneCommandHandler } from './InsertOneCommandHandler';

interface ModelTest {
  foo: unknown;
}

interface ApplicationCommandTest {
  bar: unknown;
}

interface DomainCommandTest {
  baz: unknown;
}

describe(InsertOneCommandHandler.name, () => {
  let applicationCommandToDomainCommandConverter: jest.Mocked<Converter<ApplicationCommandTest, DomainCommandTest>>;
  let insertOneCommandHandler: InsertOneCommandHandler<ApplicationCommandTest, DomainCommandTest, ModelTest>;
  let insertOneManagerMock: jest.Mocked<ManagerAsync<DomainCommandTest, ModelTest>>;

  beforeAll(() => {
    applicationCommandToDomainCommandConverter = {
      convert: jest.fn(),
    };
    insertOneManagerMock = {
      manage: jest.fn(),
    };

    insertOneCommandHandler = new InsertOneCommandHandler<ApplicationCommandTest, DomainCommandTest, ModelTest>(
      applicationCommandToDomainCommandConverter,
      insertOneManagerMock,
    );
  });

  describe('.execute()', () => {
    describe('when called', () => {
      let applicationCommandFixture: ApplicationCommandTest;
      let domainCommandFixture: DomainCommandTest;
      let modelFixture: ModelTest;

      let result: unknown;

      beforeAll(async () => {
        applicationCommandFixture = {
          bar: 'sample-value',
        };

        domainCommandFixture = {
          baz: 'sample-valuez',
        };

        modelFixture = {
          foo: 'my-foo-sample-value',
        };

        applicationCommandToDomainCommandConverter.convert.mockReturnValueOnce(domainCommandFixture);

        insertOneManagerMock.manage.mockResolvedValueOnce(modelFixture);

        result = await insertOneCommandHandler.execute(applicationCommandFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call applicationCommandToDomainCommandConverter.convert()', () => {
        expect(applicationCommandToDomainCommandConverter.convert).toHaveBeenCalledTimes(1);
        expect(applicationCommandToDomainCommandConverter.convert).toHaveBeenCalledWith(applicationCommandFixture);
      });

      it('should call insertOneManager.manage()', () => {
        expect(insertOneManagerMock.manage).toHaveBeenCalledTimes(1);
        expect(insertOneManagerMock.manage).toHaveBeenCalledWith(domainCommandFixture);
      });

      it('should return a ModelTest', () => {
        expect(result).toBe(modelFixture);
      });
    });
  });
});
