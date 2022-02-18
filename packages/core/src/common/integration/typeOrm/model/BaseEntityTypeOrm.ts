import { Column, PrimaryColumn } from 'typeorm';

export class BaseEntityTypeOrm {
  @PrimaryColumn({ length: 40, name: 'id', type: 'varchar' })
  public readonly id!: string;

  @Column({ name: 'created_at', type: 'datetime' })
  public readonly createdAt!: Date;

  @Column({ name: 'updated_at', type: 'datetime' })
  public readonly updatedAt!: Date;
}
