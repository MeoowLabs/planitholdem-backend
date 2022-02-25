import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ConverterAsync } from '../../../..';
import { FindTypeOrmAdapter } from '../../../../common/integration/typeOrm/adapter/FindTypeOrmAdapter';
import { QueryToFindQueryTypeOrmConverter } from '../../../../common/integration/typeOrm/converter/QueryToFindQueryTypeOrmConverter';
import { User } from '../../../domain/model/User';
import { UserFindQuery } from '../../../domain/query/UserFindQuery';
import { UserFindQueryToUserFindQueryTypeOrmConverterAsync } from '../converter/UserFindQueryToUserFindQueryTypeOrmConverterAsync';
import { UserTypeOrmToUserConverterAsync } from '../converter/UserTypeOrmToUserConverterAsync';
import { UserTypeOrm } from '../model/UserTypeOrm';

@Injectable()
export class FindUserTypeOrmAdapter extends FindTypeOrmAdapter<User, UserTypeOrm, UserFindQuery> {
  public constructor(
    @InjectRepository(UserTypeOrm) repository: Repository<UserTypeOrm>,
    @Inject(UserTypeOrmToUserConverterAsync)
    modelDbToModelConverter: ConverterAsync<UserTypeOrm, User>,
    @Inject(UserFindQueryToUserFindQueryTypeOrmConverterAsync)
    findQueryToFindQueryTypeOrmConverter: QueryToFindQueryTypeOrmConverter<UserTypeOrm, UserFindQuery>,
  ) {
    super(repository, modelDbToModelConverter, findQueryToFindQueryTypeOrmConverter);
  }
}
