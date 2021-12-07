import { ArrayNotEmpty, IsOptional, IsString } from 'class-validator';

import type { Sampletable1 } from '../../entity/sampledb1';

export class CreateDto implements Omit<Sampletable1, 'id' | 'updated_at' | 'created_at'> {
  @IsString()
  public title!: string;

  @IsOptional()
  @IsString()
  public content?: string;

  @ArrayNotEmpty()
  @IsString({ each: true })
  public tags!: string[];
}
