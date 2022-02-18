import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { BaseEntity } from '../../../domain/model/BaseEntity';
import { BaseEntityTypeOrm } from '../model/BaseEntityTypeOrm';
import { InsertTypeOrmAdapter } from './InsertTypeOrmAdapter';

@Injectable()
export class InsertBaseEntityTypeOrmAdapter<
  TModel extends BaseEntity,
  TModelDb extends BaseEntityTypeOrm,
  TQuery extends BaseEntity,
> extends InsertTypeOrmAdapter<TModel, TModelDb, TQuery> {
  public override async insertOne(query: TQuery): Promise<TModel> {
    const creationDate: Date = new Date();

    query.id = uuid();
    query.createdAt = creationDate;
    query.updatedAt = creationDate;

    return super.insertOne(query);
  }
}
