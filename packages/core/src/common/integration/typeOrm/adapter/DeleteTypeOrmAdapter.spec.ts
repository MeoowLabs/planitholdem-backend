import { FindConditions, QueryBuilder, Repository } from 'typeorm';

import { QueryToFindQueryTypeOrmConverter } from '../converter/QueryToFindQueryTypeOrmConverter';
import { DeleteTypeOrmAdapter } from './DeleteTypeOrmAdapter';

interface ModelTest {
  foo: unknown;
}

interface QueryTest {
  fooValue: unknown;
}

describe(DeleteTypeOrmAdapter.name, () => {
  let queryBuilderMock: jest.Mocked<QueryBuilder<ModelTest>>;
  let repositoryMock: jest.Mocked<Repository<ModelTest>>;
  let queryToQueryTypeOrmConverterMock: jest.Mocked<QueryToFindQueryTypeOrmConverter<ModelTest, QueryTest>>;
  let deleteTypeOrmAdapter: DeleteTypeOrmAdapter<ModelTest, QueryTest>;

  beforeAll(() => {
    queryBuilderMock = Object.assign(
      Object.create(QueryBuilder.prototype) as QueryBuilder<ModelTest>,
      {
        delete: jest.fn().mockReturnThis(),
        execute: jest.fn(),
      } as Partial<jest.Mocked<QueryBuilder<ModelTest>>> as jest.Mocked<QueryBuilder<ModelTest>>,
    );

    repositoryMock = {
      createQueryBuilder: jest.fn().mockReturnValue(queryBuilderMock),
      delete: jest.fn(),
    } as Partial<jest.Mocked<Repository<ModelTest>>> as jest.Mocked<Repository<ModelTest>>;

    queryToQueryTypeOrmConverterMock = {
      convert: jest.fn(),
    };

    deleteTypeOrmAdapter = new DeleteTypeOrmAdapter(repositoryMock, queryToQueryTypeOrmConverterMock);
  });

  describe('.delete', () => {
    describe('when called and queryToQueryTypeOrmConverter returns FindConditions<ModelTest>', () => {
      let queryFixture: QueryTest;
      let queryTypeOrmFixture: FindConditions<ModelTest>;

      beforeAll(async () => {
        queryFixture = {
          fooValue: 'foo-value',
        };

        queryTypeOrmFixture = {};

        (queryToQueryTypeOrmConverterMock.convert as jest.Mock<FindConditions<ModelTest>>).mockReturnValueOnce(
          queryTypeOrmFixture,
        );

        await deleteTypeOrmAdapter.delete(queryFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call repository.createQueryBuilder()', () => {
        expect(repositoryMock.createQueryBuilder).toHaveBeenCalledTimes(1);
        expect(repositoryMock.createQueryBuilder).toHaveBeenCalledWith();
      });

      it('should call queryBuilder.delete()', () => {
        expect(queryBuilderMock.delete).toHaveBeenCalledTimes(1);
        expect(queryBuilderMock.delete).toHaveBeenCalledWith();
      });

      it('should call queryToQueryTypeOrmConverter.convert()', () => {
        expect(queryToQueryTypeOrmConverterMock.convert).toHaveBeenCalledTimes(1);
        expect(queryToQueryTypeOrmConverterMock.convert).toHaveBeenCalledWith(queryFixture, queryBuilderMock);
      });

      it('should call repositoryMock.delete()', () => {
        expect(repositoryMock.delete).toHaveBeenCalledTimes(1);
        expect(repositoryMock.delete).toHaveBeenCalledWith(queryTypeOrmFixture);
      });
    });

    describe('when called and queryToQueryTypeOrmConverter returns QueryBuilder<ModelTest>', () => {
      let queryFixture: QueryTest;

      beforeAll(async () => {
        queryFixture = {
          fooValue: 'foo-value',
        };

        (queryToQueryTypeOrmConverterMock.convert as jest.Mock<QueryBuilder<ModelTest>>).mockReturnValueOnce(
          queryBuilderMock,
        );

        await deleteTypeOrmAdapter.delete(queryFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call repository.createQueryBuilder()', () => {
        expect(repositoryMock.createQueryBuilder).toHaveBeenCalledTimes(1);
        expect(repositoryMock.createQueryBuilder).toHaveBeenCalledWith();
      });

      it('should call queryBuilder.delete()', () => {
        expect(queryBuilderMock.delete).toHaveBeenCalledTimes(1);
        expect(queryBuilderMock.delete).toHaveBeenCalledWith();
      });

      it('should call queryToQueryTypeOrmConverter.convert()', () => {
        expect(queryToQueryTypeOrmConverterMock.convert).toHaveBeenCalledTimes(1);
        expect(queryToQueryTypeOrmConverterMock.convert).toHaveBeenCalledWith(queryFixture, queryBuilderMock);
      });

      it('should call queryBuilder.execute()', () => {
        expect(queryBuilderMock.execute).toHaveBeenCalledTimes(1);
        expect(queryBuilderMock.execute).toHaveBeenCalledWith();
      });
    });
  });
});
