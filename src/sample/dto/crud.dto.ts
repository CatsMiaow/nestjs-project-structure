import { IsOptional, IsString } from 'class-validator';

export class CrudDto {
  @IsString()
  public title!: string;

  @IsOptional()
  @IsString()
  public content?: string;
}
