import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import type { DataSourceOptions } from 'typeorm';

import { Sampletable1 } from '#entity/sampledb1';
import { configuration } from '../../config';
import { CrudService } from './crud.service';

let moduleRef: TestingModule;
let crud: CrudService;
let idx: number;

beforeAll(async () => {
  moduleRef = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot({ ...(<DataSourceOptions>(await configuration()).db) }),
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
