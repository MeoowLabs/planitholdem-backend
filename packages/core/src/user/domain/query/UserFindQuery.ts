import { IQuery } from '@nestjs/cqrs';

export class UserFindQuery implements IQuery {
  constructor(public readonly id: string | undefined, public readonly email: string | undefined) {}
}
