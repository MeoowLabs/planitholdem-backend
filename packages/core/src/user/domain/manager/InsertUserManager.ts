import { Inject, Injectable } from '@nestjs/common';

import { InsertAdapter } from '../../../common/domain/adapter/InsertAdapter';
import { InsertOneManager } from '../../../common/domain/service/InsertOneManager';
import { UserInsertCommand } from '../command/UserInsertCommand';
import { User } from '../model/User';

@Injectable()
export class InsertUserManager extends InsertOneManager<User, UserInsertCommand> {
  public constructor(@Inject() insertAdapter: InsertAdapter<User, UserInsertCommand>) {
    super(insertAdapter);
  }
}
