import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';

import { Sampletable1 } from '#entity/sampledb1';
import { UtilService } from '../../common';
import type { SimpleInput, SimpleArgs } from '../dto';
import { Simple } from '../models';

@Injectable()
export class SimpleService {
  constructor(
    @InjectPinoLogger(SimpleService.name) private readonly logger: PinoLogger,
    @InjectRepository(Sampletable1) private sampletable: Repository<Sampletable1>,
    private util: UtilService,
  ) {}

  public async create(data: SimpleInput): Promise<Simple> {
    this.logger.info('create');

    return this.sampletable.save(data);
  }

  public async read(id: number): Promise<Simple | null> {
    this.logger.info('read');

    const row = await this.sampletable.findOneBy({ id });
    if (!row) {
      return null;
    }

    return Object.assign(new Simple(), row, { createdAt: row.created_at });
  }

  public async find(args: SimpleArgs): Promise<Simple[]> {
    this.logger.info('find');

    const result = await this.sampletable.find(
      this.util.removeUndefined({
        title: args.title,
        content: args.content,
      }),
    );

    return result.map((row: Sampletable1) => Object.assign(new Simple(), row, { createdAt: row.created_at }));
  }

  public async remove(id: number): Promise<boolean> {
    this.logger.info('remove');

    const result = await this.sampletable.delete(id);

    return !!result.affected;
  }
}
