import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Simple {
  @Field(() => ID)
  public id!: number;

  @Field(() => Int, { nullable: true })
  public score?: number;

  // If there is no type, the default is Float
  @Field(() => Float, { nullable: true })
  public rating?: number;

  @Field()
  public title!: string;

  @Field({ nullable: true })
  public content?: string;

  @Field(() => [String], { nullable: true })
  public tags?: string[];

  @Field(() => Date, { nullable: true })
  public createdAt?: Date;
}
