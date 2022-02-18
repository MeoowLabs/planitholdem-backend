import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';

import { BaseEntityInsertCommandToBaseEntityInsertQueryTypeOrmConverter } from '../../../../common/domain/converter/BaseEntityInsertCommandToBaseEntityInsertQueryTypeOrmConverter';
import { BaseEntityTypeOrm } from '../../../../common/integration/typeOrm/model/BaseEntityTypeOrm';
import { UserInsertCommand } from '../../../domain/command/UserInsertCommand';
import { UserTypeOrm } from '../model/UserTypeOrm';

@Injectable()
export class UserInsertCommandToUserInsertQueryTypeOrmConverter extends BaseEntityInsertCommandToBaseEntityInsertQueryTypeOrmConverter<
  UserInsertCommand,
  DeepPartial<UserTypeOrm>
> {
  public override convert(input: UserInsertCommand): DeepPartial<UserTypeOrm> {
    const baseEntityInsertQueryTypeOrm: DeepPartial<BaseEntityTypeOrm> = super.convert(input);

    const userInsertQueryTypeOrm: DeepPartial<UserTypeOrm> = {
      email: input.email,
      name: input.name,
      surname: input.surname,
      ...baseEntityInsertQueryTypeOrm,
    };

    return userInsertQueryTypeOrm;
  }
}
