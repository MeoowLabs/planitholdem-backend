import { Injectable } from '@nestjs/common';

import { BaseEntityTypeOrmToBaseEntityConverterAsync } from '../../../../common/domain/converter/BaseEntityTypeOrmToBaseEntityConverterAsync';
import { BaseEntity } from '../../../../common/domain/model/BaseEntity';
import { User } from '../../../domain/model/User';
import { UserTypeOrm } from '../model/UserTypeOrm';

@Injectable()
export class UserTypeOrmToUserConverterAsync extends BaseEntityTypeOrmToBaseEntityConverterAsync<UserTypeOrm, User> {
  protected async convertToEntity(input: UserTypeOrm, baseEntity: BaseEntity): Promise<User> {
    const user: User = {
      ...baseEntity,
      email: input.email,
      name: input.name,
      passwordHash: input.passwordHash,
      surname: input.surname,
    };

    return user;
  }
}
