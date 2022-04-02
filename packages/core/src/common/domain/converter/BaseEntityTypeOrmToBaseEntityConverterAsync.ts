import { Injectable } from '@nestjs/common';

import { BaseEntityTypeOrm } from '../../integration/typeOrm/model/BaseEntityTypeOrm';
import { BaseEntity } from '../model/BaseEntity';
import { ConverterAsync } from './ConverterAsync';

@Injectable()
export abstract class BaseEntityTypeOrmToBaseEntityConverterAsync<
  TInput extends BaseEntityTypeOrm,
  TOutput extends BaseEntity,
> implements ConverterAsync<TInput, TOutput>
{
  public async convert(input: TInput): Promise<TOutput> {
    const baseEntity: BaseEntity = this.convertToBaseEntity(input);

    const output: TOutput = await this.convertToEntity(input, baseEntity);

    return output;
  }

  private convertToBaseEntity(input: TInput): BaseEntity {
    const output: BaseEntity = {
      createdAt: input.createdAt,
      id: input.id,
      updatedAt: input.updatedAt,
    };

    return output;
  }

  protected abstract convertToEntity(input: TInput, baseEntity: BaseEntity): Promise<TOutput>;
}
