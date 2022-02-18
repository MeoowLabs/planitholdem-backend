import { Column, Entity } from 'typeorm';

import { BaseEntityTypeOrm } from '../../../../common/integration/typeOrm/model/BaseEntityTypeOrm';

@Entity('User')
export class UserTypeOrm extends BaseEntityTypeOrm {
  @Column({ length: 255, name: 'name', type: 'varchar' })
  public readonly name!: string;

  @Column({ length: 255, name: 'surname', type: 'varchar' })
  public readonly surname!: string;

  @Column({ length: 255, name: 'email', type: 'varchar' })
  public readonly email!: string;

  @Column({ length: 2048, name: 'passwordHash', type: 'varchar' })
  public readonly passwordHash!: string;

  @Column({ length: 2048, name: 'salt', type: 'varchar' })
  public readonly salt!: string;
}
