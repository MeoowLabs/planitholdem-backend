jest.mock('argon2');
jest.mock('uuid');

import { hash } from 'argon2';
import { DeepPartial } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { UserInsertCommand } from '../../../domain/command/UserInsertCommand';
import { UserInsertCommandFixtures } from '../../../fixtures/domain/command/UserInsertCommandFixtures';
import { UserInsertQueryTypeOrmFixtures } from '../../../fixtures/integration/typeOrm/UserInsertQueryTypeOrmFixtures';
import { UserTypeOrm } from '../model/UserTypeOrm';
import { UserInsertCommandToUserInsertQueryTypeOrmConverterAsync } from './UserInsertCommandToUserInsertQueryTypeOrmConverterAsync';

describe(UserInsertCommandToUserInsertQueryTypeOrmConverterAsync.name, () => {
  let userInsertCommandToUserInsertQueryTypeOrmConverterAsync: UserInsertCommandToUserInsertQueryTypeOrmConverterAsync;

  beforeAll(() => {
    userInsertCommandToUserInsertQueryTypeOrmConverterAsync =
      new UserInsertCommandToUserInsertQueryTypeOrmConverterAsync();
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let userInsertCommandFixture: UserInsertCommand;
      let userInsertQueryTypeOrmFixture: DeepPartial<UserTypeOrm>;
      let result: unknown;

      beforeAll(async () => {
        userInsertCommandFixture = UserInsertCommandFixtures.any;
        userInsertQueryTypeOrmFixture = UserInsertQueryTypeOrmFixtures.withAllFields;

        jest.useFakeTimers();

        jest.setSystemTime(userInsertQueryTypeOrmFixture.createdAt as Date);

        (hash as jest.Mock).mockResolvedValueOnce(userInsertQueryTypeOrmFixture.passwordHash);
        (uuid as jest.Mock<string>).mockReturnValueOnce(userInsertQueryTypeOrmFixture.id as string);

        result = await userInsertCommandToUserInsertQueryTypeOrmConverterAsync.convert(userInsertCommandFixture);
      });

      afterAll(() => {
        jest.useRealTimers();
        jest.clearAllMocks();
      });

      it('should call uuid', () => {
        expect(uuid).toHaveBeenCalledTimes(1);
        expect(uuid).toHaveBeenCalledWith();
      });

      it('should call hash()', () => {
        expect(hash).toHaveBeenCalledTimes(1);
        expect(hash).toHaveBeenCalledWith(userInsertCommandFixture.password);
      });

      it('should return a DeepPartial<UserTypeOrm>', () => {
        expect(result).toStrictEqual(userInsertQueryTypeOrmFixture);
      });
    });
  });
});
