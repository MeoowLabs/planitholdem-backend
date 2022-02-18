import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';

import { BaseEntityFindQueryToBaseEntityFindQueryTypeOrmConverter } from '../../../../common/domain/converter/BaseEntityFindQueryToBaseEntityFindQueryTypeOrmConverter';
import { UserFindQuery } from '../../../domain/query/UserFindQuery';
import { UserTypeOrm } from '../model/UserTypeOrm';

@Injectable()
export class UserFindQueryToUserFindQueryTypeOrmConverter extends BaseEntityFindQueryToBaseEntityFindQueryTypeOrmConverter<
  UserFindQuery,
  FindConditions<UserTypeOrm>
> {
  public override convert(input: UserFindQuery): FindConditions<UserTypeOrm> {
    const userFindQueryTypeOrm: FindConditions<UserTypeOrm> = super.convert(input);

    if (input.email !== undefined) {
      userFindQueryTypeOrm.email = input.email;
    }

    return userFindQueryTypeOrm;
  }
}
