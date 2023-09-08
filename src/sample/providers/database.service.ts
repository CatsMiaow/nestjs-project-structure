import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { Sampletable1 } from '#entity/sampledb1';
import { Sampletable2 } from '#entity/sampledb2';

/**
 * Database Query Execution Example
 */
@Injectable()
export class DatabaseService {
  private tablerepo: Repository<Sampletable1>;

  constructor(
    /**
     * Sample1
     * https://typeorm.io/#/working-with-repository
     * https://typeorm.io/#/repository-api
     * Need TypeOrmModule.forFeature([]) imports
     */
    @InjectRepository(Sampletable1)
    private sampletable1: Repository<Sampletable1>,

    /**
     * Sample2
     * https://typeorm.io/#/working-with-entity-manager
     * https://typeorm.io/#/entity-manager-api
     */
    @InjectEntityManager()
    private manager: EntityManager,
  ) {
    /**
     * Sample3
     * https://typeorm.io/#/entity-manager-api - getRepository
     */
    this.tablerepo = this.manager.getRepository(Sampletable1);
  }

  /**
   * https://typeorm.io/#/find-options
   */
  public async sample1(): Promise<Sampletable1[]> {
    // Repository
    return this.sampletable1.find();
  }

  public async sample2(): Promise<Sampletable1[]> {
    // EntityManager
    return this.manager.find(Sampletable1);
  }

  public async sample3(): Promise<Sampletable1[]> {
    // EntityManagerRepository
    return this.tablerepo.find();
  }

  /**
   * https://typeorm.io/#/select-query-builder
   */
  public async joinQuery(): Promise<boolean> {
    await this.sampletable1
      .createQueryBuilder('tb1')
      .innerJoin('sampletable2', 'tb2', 'tb2.id = tb1.id') // inner or left
      .select(['tb1', 'tb2.title'])
      .where('tb1.id = :id', { id: 123 })
      .getRawOne(); // getOne, getMany, getRawMany ...

    await this.sampletable1.createQueryBuilder('tb1').innerJoinAndSelect('sampletable2', 'tb2', 'tb2.id = tb1.id').getOne();

    await this.sampletable1.createQueryBuilder('tb1').leftJoinAndSelect(Sampletable2, 'tb2', 'tb2.id = tb1.id').getRawMany();

    await this.sampletable1.createQueryBuilder('tb1').leftJoinAndMapOne('tb1.tb2row', 'sampletable2', 'tb2', 'tb2.id = tb1.id').getOne();

    await this.sampletable1.createQueryBuilder('tb1').leftJoinAndMapMany('tb1.tb2row', Sampletable2, 'tb2', 'tb2.id = tb1.id').getMany();

    return true;
  }
}
