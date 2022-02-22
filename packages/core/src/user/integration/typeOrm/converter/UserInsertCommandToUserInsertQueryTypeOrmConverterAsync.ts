import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { DeepPartial } from 'typeorm';

import { BaseEntityInsertCommandToBaseEntityInsertQueryTypeOrmConverterAsync } from '../../../../common/domain/converter/BaseEntityInsertCommandToBaseEntityInsertQueryTypeOrmConverterAsync';
import { UserInsertCommand } from '../../../domain/command/UserInsertCommand';
import { UserTypeOrm } from '../model/UserTypeOrm';

@Injectable()
export class UserInsertCommandToUserInsertQueryTypeOrmConverterAsync extends BaseEntityInsertCommandToBaseEntityInsertQueryTypeOrmConverterAsync<
  UserInsertCommand,
  DeepPartial<UserTypeOrm>
> {
  protected async convertToEntityInsertQueryTypeOrm(
    input: UserInsertCommand,
    baseEntityFindQueryTypeOrm: DeepPartial<UserTypeOrm>,
  ): Promise<DeepPartial<UserTypeOrm>> {
    baseEntityFindQueryTypeOrm.email = input.email;
    baseEntityFindQueryTypeOrm.name = input.name;
    baseEntityFindQueryTypeOrm.passwordHash = await hash(input.password);
    baseEntityFindQueryTypeOrm.surname = input.surname;

    return baseEntityFindQueryTypeOrm;
  }
}
