import { Column, Entity } from 'typeorm';

import { BaseEntityTypeOrm } from '../../../../common/integration/typeOrm/model/BaseEntityTypeOrm';

@Entity('User')
export class UserTypeOrm extends BaseEntityTypeOrm {
  @Column({ length: 255, name: 'name', type: 'varchar' })
  public name!: string;

  @Column({ length: 255, name: 'surname', type: 'varchar' })
  public surname!: string;

  @Column({ length: 255, name: 'email', type: 'varchar' })
  public email!: string;

  @Column({ length: 2048, name: 'passwordHash', type: 'varchar' })
  public passwordHash!: string;

  @Column({ length: 2048, name: 'salt', type: 'varchar' })
  public salt!: string;
}
