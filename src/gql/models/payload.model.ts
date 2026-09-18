import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Payload {
  @Field()
  public userId!: string;

  @Field()
  public username!: string;

  @Field(() => [String])
  public roles: string[] = [];
}
