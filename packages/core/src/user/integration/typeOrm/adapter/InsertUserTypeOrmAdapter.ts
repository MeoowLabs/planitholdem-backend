import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { ConverterAsync } from '../../../../common/domain/converter/ConverterAsync';
import { InsertTypeOrmAdapter } from '../../../../common/integration/typeOrm/adapter/InsertTypeOrmAdapter';
import { UserInsertCommand } from '../../../domain/command/UserInsertCommand';
import { User } from '../../../domain/model/User';
import { UserInsertCommandToUserInsertQueryTypeOrmConverterAsync } from '../converter/UserInsertCommandToUserInsertQueryTypeOrmConverterAsync';
import { UserTypeOrmToUserConverterAsync } from '../converter/UserTypeOrmToUserConverterAsync';
import { UserTypeOrm } from '../model/UserTypeOrm';

@Injectable()
export class InsertUserTypeOrmAdapter extends InsertTypeOrmAdapter<User, UserTypeOrm, UserInsertCommand> {
  public constructor(
    @InjectRepository(UserTypeOrm) repository: Repository<UserTypeOrm>,
    @Inject(UserTypeOrmToUserConverterAsync) userTypeOrmToUserConverter: ConverterAsync<UserTypeOrm, User>,
    @Inject(UserInsertCommandToUserInsertQueryTypeOrmConverterAsync)
    userInsertCommandToCatInsertQueryTypeOrmConverter: ConverterAsync<UserInsertCommand, DeepPartial<UserTypeOrm>>,
  ) {
    super(repository, userTypeOrmToUserConverter, userInsertCommandToCatInsertQueryTypeOrmConverter);
  }
}
