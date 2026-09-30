import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Payload {
  public userId!: string;
  public username!: string;
  public roles: string[] = [];
}
