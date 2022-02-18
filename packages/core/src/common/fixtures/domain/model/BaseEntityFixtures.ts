import { BaseEntity } from '../../../domain/model/BaseEntity';

export class BaseEntityFixtures {
  public static get any(): BaseEntity {
    const dateFixture: Date = new Date();

    return {
      createdAt: dateFixture,
      id: 'id-example',
      updatedAt: dateFixture,
    };
  }
}
