import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Sampletable1 } from '#entity/sampledb1';
import { CrudService } from './crud.service';
import { configuration } from '../../config';

let moduleRef: TestingModule | undefined;
let crud: CrudService;
let idx: number;

beforeAll(async () => {
  moduleRef = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule.forRoot({ load: [configuration] })],
        useFactory: (config: ConfigService) => ({ ...config.get<TypeOrmModuleOptions>('db') }),
        inject: [ConfigService],
      }),
      TypeOrmModule.forFeature([Sampletable1]),
    ],
    providers: [CrudService],
  }).compile();

  crud = moduleRef.get(CrudService);
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
  expect(await crud.update(idx, { title: 'Blahblahblah', tags: ['update'] })).toHaveProperty('affected');
});

test('delete', async () => {
  const result = await crud.remove(idx);
  expect(result).toHaveProperty('affected');
  expect(result.affected).toBe(1);
});

afterAll(async () => {
  await moduleRef?.close();
});
