import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  public id!: string;

  @Field()
  public name!: string;

  @Field()
  public email!: string;

  @Field(() => [String])
  public roles: string[] = [];
}
