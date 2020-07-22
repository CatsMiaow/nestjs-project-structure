import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

import { Sampletable1 } from '../../entity/sampledb1';

@Injectable()
export class CrudService {
  constructor(
    @InjectRepository(Sampletable1)
    private table: Repository<Sampletable1>,
  ) {}

  public create(data: Partial<Sampletable1>): Promise<Sampletable1> {
    return this.table.save(data);
  }

  public read(id: number): Promise<Sampletable1 | undefined> {
    return this.table.findOne(id);
  }

  public update(id: number, data: Partial<Sampletable1>): Promise<UpdateResult> {
    return this.table.update(id, data);
  }

  public remove(id: number): Promise<DeleteResult> {
    return this.table.delete(id);
  }
}
