import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { configuration } from '../../config';
import { Sampletable1 } from '../../entity/sampledb1';
import { CrudService } from '../providers';
import { CrudController } from './crud.controller';

let moduleRef: TestingModule;
let crud: CrudController;
let idx: number;

beforeAll(async () => {
  moduleRef = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule.forRoot({ load: [configuration] })],
        useFactory: (config: ConfigService) => ({ ...config.get('db') }),
        inject: [ConfigService],
      }),
      TypeOrmModule.forFeature([Sampletable1]),
    ],
    controllers: [CrudController],
    providers: [CrudService],
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
