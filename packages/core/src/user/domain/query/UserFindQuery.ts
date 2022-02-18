import { BaseEntityFindQuery } from '../../../common/domain/query/BaseEntityFindQuery';

export class UserFindQuery extends BaseEntityFindQuery {
  constructor(id: string | undefined, public readonly email: string | undefined) {
    super(id);
  }
}
