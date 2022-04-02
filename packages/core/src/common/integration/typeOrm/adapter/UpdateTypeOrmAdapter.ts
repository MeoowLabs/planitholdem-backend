import { Injectable } from '@nestjs/common';
import { FindConditions, QueryBuilder, Repository, UpdateQueryBuilder } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { UpdateAdapter } from '../../../domain/adapter/UpdateAdapter';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { QueryToFindQueryTypeOrmConverter } from '../converter/QueryToFindQueryTypeOrmConverter';
import { VirtualQueryToFindQueryTypeOrmConverter } from '../converter/VirtualQueryToFindQueryTypeOrmConverter';

@Injectable()
export class UpdateTypeOrmAdapter<TModelDb, TQuery> implements UpdateAdapter<TQuery> {
  public constructor(
    private readonly updateQueryToFindQueryTypeOrmConverter: QueryToFindQueryTypeOrmConverter<TModelDb, TQuery>,
    private readonly updateQueryToSetQueryTypeOrmConverter: ConverterAsync<TQuery, QueryDeepPartialEntity<TModelDb>>,
    private readonly repository: Repository<TModelDb>,
  ) {}

  public async update(query: TQuery): Promise<void> {
    const updateQueryBuilder: UpdateQueryBuilder<TModelDb> = this.repository.createQueryBuilder().update();
    const findQueryTypeOrmOrQueryBuilder: FindConditions<TModelDb> | QueryBuilder<TModelDb> = await (
      this.updateQueryToFindQueryTypeOrmConverter as VirtualQueryToFindQueryTypeOrmConverter<TModelDb, TQuery>
    ).convert(query, updateQueryBuilder);
    const setQueryTypeOrm: QueryDeepPartialEntity<TModelDb> = await this.updateQueryToSetQueryTypeOrmConverter.convert(
      query,
    );

    if (findQueryTypeOrmOrQueryBuilder instanceof QueryBuilder) {
      await (findQueryTypeOrmOrQueryBuilder as UpdateQueryBuilder<TModelDb>).set(setQueryTypeOrm).execute();
    } else {
      await this.repository.update(findQueryTypeOrmOrQueryBuilder, setQueryTypeOrm);
    }
  }
}
