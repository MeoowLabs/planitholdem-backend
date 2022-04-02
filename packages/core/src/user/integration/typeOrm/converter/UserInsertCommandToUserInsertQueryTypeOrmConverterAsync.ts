import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { DeepPartial } from 'typeorm';

import { BaseEntityInsertCommandToBaseEntityInsertQueryTypeOrmConverterAsync } from '../../../../common/domain/converter/BaseEntityInsertCommandToBaseEntityInsertQueryTypeOrmConverterAsync';
import { BaseEntityTypeOrm } from '../../../../common/integration/typeOrm/model/BaseEntityTypeOrm';
import { UserInsertCommand } from '../../../domain/command/UserInsertCommand';
import { UserTypeOrm } from '../model/UserTypeOrm';

@Injectable()
export class UserInsertCommandToUserInsertQueryTypeOrmConverterAsync extends BaseEntityInsertCommandToBaseEntityInsertQueryTypeOrmConverterAsync<
  UserInsertCommand,
  DeepPartial<UserTypeOrm>
> {
  protected async convertToEntityInsertQueryTypeOrm(
    input: UserInsertCommand,
    baseEntityFindQueryTypeOrm: DeepPartial<BaseEntityTypeOrm>,
  ): Promise<DeepPartial<UserTypeOrm>> {
    const userInsertQueryTypeOrm: DeepPartial<UserTypeOrm> = {
      ...baseEntityFindQueryTypeOrm,
      email: input.email,
      name: input.name,
      passwordHash: await hash(input.password),
      surname: input.surname,
    };

    return userInsertQueryTypeOrm;
  }
}
