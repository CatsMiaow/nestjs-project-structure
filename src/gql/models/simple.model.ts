import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Simple {
  @Field(() => ID)
  public id!: number;

  @Field(() => Int)
  public score?: number;

  // If there is no type, the default is Float
  public rating?: number;

  public title!: string;
  public content?: string;
  public tags?: string[];

  public createdAt?: Date;
}
