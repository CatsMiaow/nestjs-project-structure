import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Sampletable1 } from '../../entity/sampledb1';

@Injectable()
export class FoobarService {
  constructor(
    @InjectRepository(Sampletable1)
    private readonly sampletable1: Repository<Sampletable1>,
  ) {}

  public getFoobars(): Promise<Sampletable1[]> {
    return this.sampletable1.find({ take: 10 });
  }
}
