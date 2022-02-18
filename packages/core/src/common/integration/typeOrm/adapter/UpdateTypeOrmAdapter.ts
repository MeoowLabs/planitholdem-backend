import { Injectable } from '@nestjs/common';
import { FindConditions, QueryBuilder, Repository, UpdateQueryBuilder } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { UpdateAdapter } from '../../../domain/adapter/UpdateAdapter';
import { Converter } from '../../../domain/converter/Converter';
import { QueryToFindQueryTypeOrmConverter } from '../service/QueryToFindQueryTypeOrmConverter';
import { VirtualQueryToFindQueryTypeOrmConverter } from '../service/VirtualQueryToFindQueryTypeOrmConverter';

@Injectable()
export class UpdateTypeOrmAdapter<TModelDb, TQuery> implements UpdateAdapter<TQuery> {
  constructor(
    private readonly updateQueryToFindQueryTypeOrmConverter: QueryToFindQueryTypeOrmConverter<TModelDb, TQuery>,
    private readonly updateQueryToSetQueryTypeOrmConverter: Converter<TQuery, QueryDeepPartialEntity<TModelDb>>,
    private readonly repository: Repository<TModelDb>,
  ) {}

  public async update(query: TQuery): Promise<void> {
    const updateQueryBuilder: UpdateQueryBuilder<TModelDb> = this.repository.createQueryBuilder().update();
    const findQueryTypeOrmOrQueryBuilder: FindConditions<TModelDb> | QueryBuilder<TModelDb> = (
      this.updateQueryToFindQueryTypeOrmConverter as VirtualQueryToFindQueryTypeOrmConverter<TModelDb, TQuery>
    ).convert(query, updateQueryBuilder);
    const setQueryTypeOrm: QueryDeepPartialEntity<TModelDb> = this.updateQueryToSetQueryTypeOrmConverter.convert(query);

    if (findQueryTypeOrmOrQueryBuilder instanceof QueryBuilder) {
      await (findQueryTypeOrmOrQueryBuilder as UpdateQueryBuilder<TModelDb>).set(setQueryTypeOrm).execute();
    } else {
      await this.repository.update(findQueryTypeOrmOrQueryBuilder, setQueryTypeOrm);
    }
  }
}
