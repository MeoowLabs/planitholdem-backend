import { IQuery } from '@nestjs/cqrs';

export class BaseEntityFindQuery implements IQuery {
  constructor(public readonly id: string) {}
}
