import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tablename1 } from '../../entity/dbname1';

@Injectable()
export class FoobarService {
  constructor(
    @InjectRepository(Tablename1)
    private readonly tablename1: Repository<Tablename1>,
  ) {}

  public getFoobars(): Promise<Tablename1[]> {
    return this.tablename1.find({ take: 10 });
  }
}
