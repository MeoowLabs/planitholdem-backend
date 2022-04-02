import { FindConditions, QueryBuilder, Repository, UpdateQueryBuilder } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { QueryToFindQueryTypeOrmConverter } from '../converter/QueryToFindQueryTypeOrmConverter';
import { UpdateTypeOrmAdapter } from './UpdateTypeOrmAdapter';

interface ModelTest {
  foo: unknown;
}

interface QueryTest {
  bar: unknown;
}

describe(UpdateTypeOrmAdapter.name, () => {
  let queryBuilderMock: jest.Mocked<UpdateQueryBuilder<ModelTest>>;
  let updateQueryToFindQueryTypeOrmConverterMock: jest.Mocked<QueryToFindQueryTypeOrmConverter<ModelTest, QueryTest>>;
  let updateQueryToSetQueryTypeOrmConverterMock: jest.Mocked<
    ConverterAsync<QueryTest, QueryDeepPartialEntity<ModelTest>>
  >;
  let repositoryMock: jest.Mocked<Repository<ModelTest>>;

  let updateTypeOrmAdapter: UpdateTypeOrmAdapter<ModelTest, QueryTest>;

  beforeAll(() => {
    queryBuilderMock = Object.assign(
      Object.create(UpdateQueryBuilder.prototype) as QueryBuilder<ModelTest>,
      {
        execute: jest.fn(),
        set: jest.fn().mockReturnThis(),
        update: jest.fn().mockReturnThis(),
      } as Partial<jest.Mocked<UpdateQueryBuilder<ModelTest>>> as jest.Mocked<UpdateQueryBuilder<ModelTest>>,
    );
    updateQueryToFindQueryTypeOrmConverterMock = {
      convert: jest.fn(),
    };
    updateQueryToSetQueryTypeOrmConverterMock = {
      convert: jest.fn(),
    };
    repositoryMock = {
      createQueryBuilder: jest.fn().mockReturnValue(queryBuilderMock),
      update: jest.fn(),
    } as Partial<jest.Mocked<Repository<ModelTest>>> as jest.Mocked<Repository<ModelTest>>;

    updateTypeOrmAdapter = new UpdateTypeOrmAdapter(
      updateQueryToFindQueryTypeOrmConverterMock,
      updateQueryToSetQueryTypeOrmConverterMock,
      repositoryMock,
    );
  });

  describe('.update()', () => {
    describe('when called and updateQueryToFindQueryTypeOrmConverter returns FindConditions<TModelDb>', () => {
      let queryFixture: QueryTest;
      let findQueryTypeOrmFixture: FindConditions<ModelTest>;
      let setQueryTypeOrmFixture: QueryDeepPartialEntity<ModelTest>;

      beforeAll(async () => {
        queryFixture = {
          bar: 'sample',
        };

        findQueryTypeOrmFixture = {
          foo: 'sample-string',
        };

        setQueryTypeOrmFixture = {
          foo: 'sample-string-modified',
        };

        (
          updateQueryToFindQueryTypeOrmConverterMock.convert as jest.Mock<Promise<FindConditions<ModelTest>>>
        ).mockResolvedValueOnce(findQueryTypeOrmFixture);
        updateQueryToSetQueryTypeOrmConverterMock.convert.mockResolvedValueOnce(setQueryTypeOrmFixture);

        await updateTypeOrmAdapter.update(queryFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('shoud call updateQueryToFindQueryTypeOrmConverter.convert()', () => {
        expect(updateQueryToFindQueryTypeOrmConverterMock.convert).toHaveBeenCalledTimes(1);
        expect(updateQueryToFindQueryTypeOrmConverterMock.convert).toHaveBeenCalledWith(queryFixture, queryBuilderMock);
      });

      it('shoud call updateQueryToSetQueryTypeOrmConverter.convert()', () => {
        expect(updateQueryToSetQueryTypeOrmConverterMock.convert).toHaveBeenCalledTimes(1);
        expect(updateQueryToSetQueryTypeOrmConverterMock.convert).toHaveBeenCalledWith(queryFixture);
      });

      it('shoud call repository.update()', () => {
        expect(repositoryMock.update).toHaveBeenCalledTimes(1);
        expect(repositoryMock.update).toHaveBeenCalledWith(findQueryTypeOrmFixture, setQueryTypeOrmFixture);
      });
    });

    describe('when called and updateQueryToFindQueryTypeOrmConverter returns QueryBuilder<TModelDb>', () => {
      let queryFixture: QueryTest;
      let setQueryTypeOrmFixture: QueryDeepPartialEntity<ModelTest>;

      beforeAll(async () => {
        queryFixture = {
          bar: 'sample',
        };

        setQueryTypeOrmFixture = {
          foo: 'sample-string-modified',
        };

        (
          updateQueryToFindQueryTypeOrmConverterMock.convert as jest.Mock<Promise<QueryBuilder<ModelTest>>>
        ).mockResolvedValueOnce(queryBuilderMock);
        updateQueryToSetQueryTypeOrmConverterMock.convert.mockResolvedValueOnce(setQueryTypeOrmFixture);

        await updateTypeOrmAdapter.update(queryFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('shoud call updateQueryToFindQueryTypeOrmConverter.convert()', () => {
        expect(updateQueryToFindQueryTypeOrmConverterMock.convert).toHaveBeenCalledTimes(1);
        expect(updateQueryToFindQueryTypeOrmConverterMock.convert).toHaveBeenCalledWith(queryFixture, queryBuilderMock);
      });

      it('shoud call updateQueryToSetQueryTypeOrmConverter.convert()', () => {
        expect(updateQueryToSetQueryTypeOrmConverterMock.convert).toHaveBeenCalledTimes(1);
        expect(updateQueryToSetQueryTypeOrmConverterMock.convert).toHaveBeenCalledWith(queryFixture);
      });

      it('shoud call queryBuilder.set()', () => {
        expect(queryBuilderMock.set).toHaveBeenCalledTimes(1);
        expect(queryBuilderMock.set).toHaveBeenCalledWith(setQueryTypeOrmFixture);
      });

      it('shoud call queryBuilder.execute()', () => {
        expect(queryBuilderMock.execute).toHaveBeenCalledTimes(1);
        expect(queryBuilderMock.execute).toHaveBeenCalledWith();
      });
    });
  });
});
