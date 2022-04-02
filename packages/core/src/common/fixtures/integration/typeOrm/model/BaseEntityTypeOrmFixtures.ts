import { BaseEntityTypeOrm } from '../../../../integration/typeOrm/model/BaseEntityTypeOrm';
import { BaseEntityFixtures } from '../../../domain/model/BaseEntityFixtures';

export class BaseEntityTypeOrmFixtures {
  public static get any(): BaseEntityTypeOrm {
    const baseEntityTypeOrm: BaseEntityTypeOrm = new BaseEntityTypeOrm();

    baseEntityTypeOrm.createdAt = BaseEntityFixtures.any.createdAt;
    baseEntityTypeOrm.id = BaseEntityFixtures.any.id;
    baseEntityTypeOrm.updatedAt = BaseEntityFixtures.any.updatedAt;

    return baseEntityTypeOrm;
  }
}
