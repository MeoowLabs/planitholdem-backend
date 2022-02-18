import { ICommand } from '@nestjs/cqrs';

export class UserInsertCommand implements ICommand {
  constructor(
    public readonly name: string,
    public readonly surname: string,
    public readonly email: string,
    public readonly password: string,
  ) {}
}
