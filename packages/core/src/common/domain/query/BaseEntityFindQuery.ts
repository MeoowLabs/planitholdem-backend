import { IQuery } from '@nestjs/cqrs';

export class BaseEntityFindQuery implements IQuery {
  public constructor(public readonly id: string | undefined) {}
}
