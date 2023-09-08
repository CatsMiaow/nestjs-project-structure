import { Transform, TransformFnParams } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { DateService } from '../providers';

/**
 * https://github.com/typestack/class-validator#validation-decorators
 * https://docs.nestjs.com/techniques/serialization
 */
export class SampleDto {
  @IsNumber()
  public id!: number;

  @IsString()
  public title!: string;

  @IsOptional()
  @IsString()
  public content?: string; // optional value

  @IsDateString() // ISO 8601
  public date: string = new Date().toISOString(); // default value

  @IsString() // Change date format
  @Transform(({ value }: TransformFnParams) => DateService.format(String(value)))
  public datetime!: string;

  @IsNotEmpty()
  public something!: string;

  @IsNumber()
  public page = 1;
}
