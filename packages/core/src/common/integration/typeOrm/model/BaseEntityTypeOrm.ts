import { Column, PrimaryColumn } from 'typeorm';

export class BaseEntityTypeOrm {
  @PrimaryColumn({ length: 40, name: 'id', type: 'varchar' })
  public id!: string;

  @Column({ name: 'created_at', type: 'datetime' })
  public createdAt!: Date;

  @Column({ name: 'updated_at', type: 'datetime' })
  public updatedAt!: Date;
}
