import { DeepPartial } from 'typeorm';

import { BaseEntityTypeOrm } from '../../../../integration/typeOrm/model/BaseEntityTypeOrm';
import { BaseEntityFixtures } from '../../../domain/model/BaseEntityFixtures';

export class BaseEntityInsertCommandTypeOrmFixtures {
  public static get any(): DeepPartial<BaseEntityTypeOrm> {
    const fixture: DeepPartial<BaseEntityTypeOrm> = {};

    return fixture;
  }

  public static get withCreatedAt(): DeepPartial<BaseEntityTypeOrm> {
    const fixture: DeepPartial<BaseEntityTypeOrm> = {
      ...BaseEntityInsertCommandTypeOrmFixtures.any,
      createdAt: BaseEntityFixtures.any.createdAt,
    };

    return fixture;
  }

  public static get withId(): DeepPartial<BaseEntityTypeOrm> {
    const fixture: DeepPartial<BaseEntityTypeOrm> = {
      ...BaseEntityInsertCommandTypeOrmFixtures.any,
      id: BaseEntityFixtures.any.id,
    };

    return fixture;
  }

  public static get withUpdatedAt(): DeepPartial<BaseEntityTypeOrm> {
    const fixture: DeepPartial<BaseEntityTypeOrm> = {
      ...BaseEntityInsertCommandTypeOrmFixtures.any,
      updatedAt: BaseEntityFixtures.any.updatedAt,
    };

    return fixture;
  }

  public static get withCreatedAtAndIdAndUpdatedAt(): DeepPartial<BaseEntityTypeOrm> {
    const fixture: DeepPartial<BaseEntityTypeOrm> = {
      ...BaseEntityInsertCommandTypeOrmFixtures.withCreatedAt,
      ...BaseEntityInsertCommandTypeOrmFixtures.withId,
      ...BaseEntityInsertCommandTypeOrmFixtures.withUpdatedAt,
    };

    return fixture;
  }
}
