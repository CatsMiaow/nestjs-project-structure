import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@ArgsType()
export class SimpleArgs {
  @Field()
  @IsString()
  public title!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  public content?: string;
}
