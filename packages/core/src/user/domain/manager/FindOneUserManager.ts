import { Inject, Injectable } from '@nestjs/common';

import { FindAdapter } from '../../../common/domain/adapter/FindAdapter';
import { FindOneManager } from '../../../common/domain/service/FindOneManager';
import { FindUserTypeOrmAdapter } from '../../integration/typeOrm/adapter/FindUserTypeOrmAdapter';
import { User } from '../model/User';
import { UserFindQuery } from '../query/UserFindQuery';

@Injectable()
export class FindOneUserManager extends FindOneManager<User, UserFindQuery> {
  public constructor(@Inject(FindUserTypeOrmAdapter) findAdapter: FindAdapter<User, UserFindQuery>) {
    super(findAdapter);
  }
}
