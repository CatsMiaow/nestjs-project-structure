import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

/**
 * https://github.com/typestack/class-validator#validation-decorators
 */
export class SampleDto {
  @IsNumber()
  public id!: number;

  @IsString()
  public title!: string;

  @IsOptional()
  @IsString()
  public content?: string;

  @IsDateString()
  public date!: string;

  @IsNotEmpty()
  public something!: string;

  @IsOptional()
  @IsNumber()
  public page?: number;
}
