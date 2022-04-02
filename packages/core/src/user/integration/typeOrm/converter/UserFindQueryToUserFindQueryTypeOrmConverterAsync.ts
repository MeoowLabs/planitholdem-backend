import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';

import { BaseEntityFindQueryToBaseEntityFindQueryTypeOrmConverterAsync } from '../../../../common/domain/converter/BaseEntityFindQueryToBaseEntityFindQueryTypeOrmConverterAsync';
import { BaseEntityTypeOrm } from '../../../../common/integration/typeOrm/model/BaseEntityTypeOrm';
import { UserFindQuery } from '../../../domain/query/UserFindQuery';
import { UserTypeOrm } from '../model/UserTypeOrm';

@Injectable()
export class UserFindQueryToUserFindQueryTypeOrmConverterAsync extends BaseEntityFindQueryToBaseEntityFindQueryTypeOrmConverterAsync<
  UserFindQuery,
  FindConditions<UserTypeOrm>
> {
  protected async convertToEntityFindQueryTypeOrm(
    input: UserFindQuery,
    baseEntityFindQueryTypeOrm: FindConditions<BaseEntityTypeOrm>,
  ): Promise<FindConditions<UserTypeOrm>> {
    const userFindQueryTypeOrm: FindConditions<UserTypeOrm> = {
      ...baseEntityFindQueryTypeOrm,
    };

    if (input.email !== undefined) {
      userFindQueryTypeOrm.email = input.email;
    }

    return userFindQueryTypeOrm;
  }
}
