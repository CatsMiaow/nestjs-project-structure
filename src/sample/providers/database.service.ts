import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { Tablename1 } from '../../entity/dbname1';
import { Tablename2 } from '../../entity/dbname2';

/**
 * Database Query Execution Example
 */
@Injectable()
export class DatabaseService {
  private readonly tablerepo: Repository<Tablename1>;

  constructor(
    /**
     * Sample1
     * https://typeorm.io/#/working-with-repository
     * https://typeorm.io/#/repository-api
     * Need TypeOrmModule.forFeature([]) imports
     */
    @InjectRepository(Tablename1)
    private readonly tablename1: Repository<Tablename1>,

    /**
     * Sample2
     * https://typeorm.io/#/working-with-entity-manager
     * https://typeorm.io/#/entity-manager-api
     */
    @InjectEntityManager()
    private readonly manager: EntityManager,
  ) {
    /**
     * Sample3
     * https://typeorm.io/#/entity-manager-api - getRepository
     */
    this.tablerepo = this.manager.getRepository(Tablename1);
  }

  /**
   * https://typeorm.io/#/find-options
   */
  public sample1(): Promise<Tablename1[]> {
    // Repository
    return this.tablename1.find();
  }

  public sample2(): Promise<Tablename1[]> {
    // EntityManager
    return this.manager.find(Tablename1);
  }

  public sample3(): Promise<Tablename1[]> {
    // EntityManagerRepository
    return this.tablerepo.find();
  }

  /**
   * https://typeorm.io/#/select-query-builder
   */
  public async joinQuery(): Promise<boolean> {
    await this.tablename1.createQueryBuilder('tb1')
      .innerJoin('tablename2', 'tb2', 'tb2.id = tb1.id') // inner or left
      .select(['tb1', 'tb2.title'])
      .where('tb1.id = :id', { id: 123 })
      .getRawOne(); // getOne, getMany, getRawMany ...

    await this.tablename1.createQueryBuilder('tb1')
      .innerJoinAndSelect('tablename2', 'tb2', 'tb2.id = tb1.id')
      .getOne();

    await this.tablename1.createQueryBuilder('tb1')
      .leftJoinAndSelect(Tablename2, 'tb2', 'tb2.id = tb1.id')
      .getRawMany();

    await this.tablename1.createQueryBuilder('tb1')
      .leftJoinAndMapOne('tb1.tb2row', 'tablename2', 'tb2', 'tb2.id = tb1.id')
      .getOne();

    await this.tablename1.createQueryBuilder('tb1')
      .leftJoinAndMapMany('tb1.tb2row', Tablename2, 'tb2', 'tb2.id = tb1.id')
      .getMany();

    return true;
  }
}
