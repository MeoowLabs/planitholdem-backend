import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { BaseEntityTypeOrm } from '../../integration/typeOrm/model/BaseEntityTypeOrm';
import { BaseEntityInsertCommand } from '../command/BaseEntityInsertCommand';
import { Converter } from './Converter';

@Injectable()
export class BaseEntityInsertCommandToBaseEntityInsertQueryTypeOrmConverter<
  TInput extends BaseEntityInsertCommand,
  TOutput extends DeepPartial<BaseEntityTypeOrm>,
> implements Converter<TInput, TOutput>
{
  public convert(input: TInput): TOutput {
    const date: Date = new Date();

    const output: DeepPartial<BaseEntityTypeOrm> = {
      createdAt: date,
      id: uuid(),
      updatedAt: date,
    };

    return output as TOutput;
  }
}
