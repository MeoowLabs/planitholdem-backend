import { FindConditions, QueryBuilder, WhereExpressionBuilder } from 'typeorm';

import { ConverterAsync } from '../../../domain/converter/ConverterAsync';

export type QueryToFindQueryTypeOrmConverter<TModelDb, TQuery> =
  | ConverterAsync<TQuery, FindConditions<TModelDb>>
  | ConverterAsync<
      TQuery,
      QueryBuilder<TModelDb> & WhereExpressionBuilder,
      QueryBuilder<TModelDb> & WhereExpressionBuilder
    >;
