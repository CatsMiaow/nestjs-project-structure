import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { Tablename } from '../../entity/dbname';

/**
 * Database Query Execution Example
 */
@Injectable()
export class DatabaseService {
  private readonly tablerepo: Repository<Tablename>;

  constructor(
    /**
     * Sample1
     * https://typeorm.io/#/working-with-repository
     * https://typeorm.io/#/repository-api
     * Need TypeOrmModule.forFeature([]) imports
     */
    @InjectRepository(Tablename)
    private readonly tablename: Repository<Tablename>,

    /**
     * Sample2
     * https://typeorm.io/#/working-with-entity-manager
     * https://typeorm.io/#/entity-manager-api
     */
    @InjectEntityManager()
    private readonly manager: EntityManager
  ) {

    /**
     * Sample3
     * https://typeorm.io/#/entity-manager-api - getRepository
     */
    this.tablerepo = this.manager.getRepository(Tablename);
  }

  /**
   * https://typeorm.io/#/find-options
   */
  public sample1(): Promise<Tablename[]> {
    // Repository
    return this.tablename.find();
  }

  public sample2(): Promise<Tablename[]> {
    // EntityManager
    return this.manager.find(Tablename);
  }

  public sample3(): Promise<Tablename[]> {
    // EntityManagerRepository
    return this.tablerepo.find();
  }
}
