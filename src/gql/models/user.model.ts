import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  public id!: string;
  public name!: string;
  public email!: string;
  public roles: string[] = [];
}
