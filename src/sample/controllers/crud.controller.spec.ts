import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonModule } from '../../common/common.module';
import { configuration } from '../../config';
import { Sampletable1 } from '../../entity/sampledb1';
import { SampleModule } from '../sample.module';
import { CrudController } from './crud.controller';

let moduleRef: TestingModule;
let crud: CrudController;
let idx: number;

beforeAll(async () => {
  // moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
  moduleRef = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        load: [configuration],
      }),
      CommonModule,
      SampleModule,
      /*
      TypeOrmModule.forRoot({
        ...(<ConnectionOptions>(await configuration()).db),
        entities: [],
      }),
      */
      TypeOrmModule.forRootAsync({
        useFactory: (config: ConfigService) => ({
          entities: [`${__dirname}/../../entity/**/*.{js,ts}`],
          ...config.get('db'),
        }),
        inject: [ConfigService],
      }),
    ],
  }).compile();

  crud = moduleRef.get(CrudController);
});

test('create', async () => {
  const result = await crud.create({ title: 'FooBar', content: 'Hello World', tags: ['new'] });
  expect(result).toHaveProperty('id');
  idx = result.id;
});

test('read', async () => {
  expect(await crud.read(idx)).toBeInstanceOf(Sampletable1);
});

test('update', async () => {
  expect(await crud.update(idx, { content: 'Blahblahblah', tags: ['update'] })).toHaveProperty('success');
});

test('delete', async () => {
  const result = await crud.remove(idx);
  expect(result).toHaveProperty('success');
  expect(result.success).toBeTruthy();
});

afterAll(async () => {
  await moduleRef?.close();
});
