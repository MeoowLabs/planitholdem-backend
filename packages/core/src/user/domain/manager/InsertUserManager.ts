import { Inject, Injectable } from '@nestjs/common';

import { InsertAdapter } from '../../../common/domain/adapter/InsertAdapter';
import { InsertOneManager } from '../../../common/domain/service/InsertOneManager';
import { InsertUserTypeOrmAdapter } from '../../integration/typeOrm/adapter/InsertUserTypeOrmAdapter';
import { UserInsertCommand } from '../command/UserInsertCommand';
import { User } from '../model/User';

@Injectable()
export class InsertUserManager extends InsertOneManager<User, UserInsertCommand> {
  public constructor(@Inject(InsertUserTypeOrmAdapter) insertAdapter: InsertAdapter<User, UserInsertCommand>) {
    super(insertAdapter);
  }
}
