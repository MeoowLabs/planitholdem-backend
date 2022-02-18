import { BaseEntity } from '../../../common/domain/model/BaseEntity';

export interface User extends BaseEntity {
  id: string;
  name: string;
  surname: string;
  email: string;
  passwordHash: string;
  salt: string;
  createdAt: Date;
  updatedAt: Date;
}
