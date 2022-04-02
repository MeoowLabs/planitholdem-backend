import { Injectable } from '@nestjs/common';
import { Repository, DeepPartial } from 'typeorm';

import { InsertAdapter } from '../../../domain/adapter/InsertAdapter';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';

@Injectable()
export class InsertTypeOrmAdapter<TModel, TModelDb, TQuery> implements InsertAdapter<TModel, TQuery> {
  public constructor(
    private readonly repository: Repository<TModelDb>,
    private readonly modelDbToModelConverter: ConverterAsync<TModelDb, TModel>,
    private readonly queryToTypeOrmQueryConverter: ConverterAsync<TQuery, DeepPartial<TModelDb>>,
  ) {}

  public async insertOne(query: TQuery): Promise<TModel> {
    const typeOrmQuery: DeepPartial<TModelDb> = await this.queryToTypeOrmQueryConverter.convert(query);
    const modelDb: TModelDb = await this.repository.save(typeOrmQuery);
    const model: TModel = await this.modelDbToModelConverter.convert(modelDb);

    return model;
  }
}
