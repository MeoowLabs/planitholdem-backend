import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';

import { Converter } from '../../../../common/domain/converter/Converter';
import { UserFindQuery } from '../../../domain/query/UserFindQuery';
import { UserTypeOrm } from '../model/UserTypeOrm';

@Injectable()
export class UserFindQueryToUserFindQueryTypeOrmConverter
  implements Converter<UserFindQuery, FindConditions<UserTypeOrm>>
{
  public convert(input: UserFindQuery): FindConditions<UserTypeOrm> {
    const userFindQueryTypeOrm: FindConditions<UserTypeOrm> = {};

    if (input.id !== undefined) {
      userFindQueryTypeOrm.id = input.id;
    }

    if (input.email !== undefined) {
      userFindQueryTypeOrm.email = input.email;
    }

    return userFindQueryTypeOrm;
  }
}
