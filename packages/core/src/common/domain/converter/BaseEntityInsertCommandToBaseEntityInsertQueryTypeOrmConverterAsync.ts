import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { BaseEntityTypeOrm } from '../../integration/typeOrm/model/BaseEntityTypeOrm';
import { ConverterAsync } from './ConverterAsync';

@Injectable()
export abstract class BaseEntityInsertCommandToBaseEntityInsertQueryTypeOrmConverterAsync<
  TInput,
  TOutput extends DeepPartial<BaseEntityTypeOrm>,
> implements ConverterAsync<TInput, TOutput>
{
  public async convert(input: TInput): Promise<TOutput> {
    const baseEntityFindQueryTypeOrm: DeepPartial<BaseEntityTypeOrm> =
      await this.convertToBaseEntityInsertQueryTypeOrm();

    const entityInsertQueryTypeOrm: TOutput = await this.convertToEntityInsertQueryTypeOrm(
      input,
      baseEntityFindQueryTypeOrm,
    );

    return entityInsertQueryTypeOrm;
  }

  private async convertToBaseEntityInsertQueryTypeOrm(): Promise<DeepPartial<BaseEntityTypeOrm>> {
    const createdAt: Date = new Date();
    const updatedAt: Date = new Date(createdAt);

    const id: string = uuid();
    const output: DeepPartial<BaseEntityTypeOrm> = {
      createdAt,
      id,
      updatedAt,
    };

    return output;
  }

  protected abstract convertToEntityInsertQueryTypeOrm(
    input: TInput,
    baseEntityFindQueryTypeOrm: DeepPartial<BaseEntityTypeOrm>,
  ): Promise<TOutput>;
}
