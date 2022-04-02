import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';

import { BaseEntityTypeOrm } from '../../integration/typeOrm/model/BaseEntityTypeOrm';
import { BaseEntityFindQuery } from '../query/BaseEntityFindQuery';
import { ConverterAsync } from './ConverterAsync';

@Injectable()
export abstract class BaseEntityFindQueryToBaseEntityFindQueryTypeOrmConverterAsync<
  TInput extends BaseEntityFindQuery,
  TOutput extends FindConditions<BaseEntityTypeOrm>,
> implements ConverterAsync<TInput, TOutput>
{
  public async convert(input: TInput): Promise<TOutput> {
    const baseEntityFindQueryTypeOrm: FindConditions<BaseEntityTypeOrm> =
      await this.convertToBaseEntityFindQueryTypeOrm(input);

    const output: TOutput = await this.convertToEntityFindQueryTypeOrm(input, baseEntityFindQueryTypeOrm);

    return output;
  }

  private async convertToBaseEntityFindQueryTypeOrm(input: TInput): Promise<FindConditions<BaseEntityTypeOrm>> {
    const output: FindConditions<BaseEntityTypeOrm> = {};

    if (input.id !== undefined) {
      output.id = input.id;
    }

    return output;
  }

  protected abstract convertToEntityFindQueryTypeOrm(
    input: TInput,
    baseEntityFindQueryTypeOrm: FindConditions<BaseEntityTypeOrm>,
  ): Promise<TOutput>;
}
