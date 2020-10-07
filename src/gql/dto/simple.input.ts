import { InputType } from '@nestjs/graphql';
import { ArrayNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class SimpleInput {
  @IsString()
  public title!: string;

  @IsOptional()
  @IsString()
  public content?: string;

  @ArrayNotEmpty()
  @IsString({ each: true })
  public tags!: string[];
}
