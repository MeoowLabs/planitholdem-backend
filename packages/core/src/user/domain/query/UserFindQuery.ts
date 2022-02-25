import { BaseEntityFindQuery } from '../../../common/domain/query/BaseEntityFindQuery';

export interface UserFindQuery extends BaseEntityFindQuery {
  email?: string;
}
