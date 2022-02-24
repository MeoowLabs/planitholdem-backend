import { BaseEntityFindQuery } from '../../../common/domain/query/BaseEntityFindQuery';

export class UserFindQuery extends BaseEntityFindQuery {
  public constructor(id: string | undefined, public readonly email: string | undefined) {
    super(id);
  }
}
