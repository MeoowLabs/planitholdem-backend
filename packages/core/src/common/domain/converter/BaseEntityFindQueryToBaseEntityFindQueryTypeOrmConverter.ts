import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';

import { BaseEntityTypeOrm } from '../../integration/typeOrm/model/BaseEntityTypeOrm';
import { BaseEntityFindQuery } from '../query/BaseEntityFindQuery';
import { Converter } from './Converter';

@Injectable()
export class BaseEntityFindQueryToBaseEntityFindQueryTypeOrmConverter<
  TInput extends BaseEntityFindQuery,
  TOutput extends FindConditions<BaseEntityTypeOrm>,
> implements Converter<TInput, TOutput>
{
  public convert(input: TInput): TOutput {
    const output: FindConditions<BaseEntityTypeOrm> = {};

    if (input.id !== undefined) {
      output.id = input.id;
    }

    return output as TOutput;
  }
}
