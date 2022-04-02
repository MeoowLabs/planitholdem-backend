import { User } from '../../../domain/model/User';

export class UserFixtures {
  public static get any(): User {
    return {
      createdAt: new Date('2020-01-01'),
      email: 'email-example',
      id: 'id-example',
      name: 'name-example',
      passwordHash: 'password-hash-example',
      surname: 'surname-example',
      updatedAt: new Date('2020-01-01'),
    };
  }
}
