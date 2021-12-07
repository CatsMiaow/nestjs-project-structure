import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Logger, UtilService } from '../../common';
import { Sampletable1 } from '../../entity/sampledb1';
import type { SimpleInput, SimpleArgs } from '../dto';
import { Simple } from '../models';

@Injectable()
export class SimpleService {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(Sampletable1) private sampletable: Repository<Sampletable1>,
    private util: UtilService,
  ) {
    this.logger.setContext(SimpleService.name);
  }

  public async create(data: SimpleInput): Promise<Simple> {
    this.logger.log('create');

    return this.sampletable.save(data);
  }

  public async read(id: number): Promise<Simple | null> {
    this.logger.log('read');

    const row = await this.sampletable.findOne(id);
    if (!row) {
      return null;
    }

    return Object.assign(new Simple(), row, { createdAt: row.created_at });
  }

  public async find(args: SimpleArgs): Promise<Simple[]> {
    this.logger.log('find');

    const result = await this.sampletable.find(this.util.removeUndefined({
      title: args.title,
      content: args.content,
    }));

    return result.map((row: Sampletable1) => Object.assign(new Simple(), row, { createdAt: row.created_at }));
  }

  public async remove(id: number): Promise<boolean> {
    this.logger.log('remove');

    const result = await this.sampletable.delete(id);

    return !!result.affected;
  }
}
