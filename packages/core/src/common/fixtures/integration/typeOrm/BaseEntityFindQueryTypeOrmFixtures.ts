import { FindConditions } from 'typeorm';

import { BaseEntityTypeOrm } from '../../../integration/typeOrm/model/BaseEntityTypeOrm';
import { BaseEntityFixtures } from '../../domain/model/BaseEntityFixtures';

export class BaseEntityFindQueryTypeOrmFixtures {
  public static get withId(): FindConditions<BaseEntityTypeOrm> {
    return {
      id: BaseEntityFixtures.any.id,
    };
  }
}
