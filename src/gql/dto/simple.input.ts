import { Field, InputType } from '@nestjs/graphql';
import { ArrayNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class SimpleInput {
  @Field()
  @IsString()
  public title!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  public content?: string;

  @Field(() => [String])
  @ArrayNotEmpty()
  @IsString({ each: true })
  public tags!: string[];
}
