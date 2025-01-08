import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

import { Sampletable1 } from '#entity/sampledb1';

@Injectable()
export class CrudService {
  constructor(
    @InjectRepository(Sampletable1)
    private table: Repository<Sampletable1>,
  ) {}

  public async create(data: Partial<Sampletable1>): Promise<Sampletable1> {
    return await this.table.save(data);
  }

  public async read(id: number): Promise<Sampletable1 | null> {
    return await this.table.findOneBy({ id });
  }

  public async update(id: number, data: Partial<Sampletable1>): Promise<UpdateResult> {
    return await this.table.update(id, data);
  }

  public async remove(id: number): Promise<DeleteResult> {
    return await this.table.delete(id);
  }
}
