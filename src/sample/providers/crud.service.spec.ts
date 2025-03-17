import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { afterAll, beforeAll, expect, test } from 'vitest';
import { mockDeep, type DeepMockProxy } from 'vitest-mock-extended';

import { CrudService } from './crud.service.js';
import { Sampletable1 } from '../../entity/sampledb1/index.js';

let moduleRef: TestingModule | undefined;
let repository: DeepMockProxy<Repository<Sampletable1>>;
let service: CrudService;
let mockValue: Sampletable1;

beforeAll(async () => {
  moduleRef = await Test.createTestingModule({
    providers: [
      CrudService,
      {
        provide: getRepositoryToken(Sampletable1),
        useValue: mockDeep<Repository<Sampletable1>>(),
      },
    ],
  }).compile();

  repository = moduleRef.get(getRepositoryToken(Sampletable1));
  service = moduleRef.get(CrudService);
});

test('create', async () => {
  const data = { title: 'FooBar', content: 'Hello World', tags: ['new'] };
  mockValue = { id: 1, ...data, created_at: new Date(), updated_at: new Date() };
  repository.save.mockResolvedValueOnce(mockValue);

  const result = await service.create(data);
  expect(result).toHaveProperty('id', 1);
});

test('read', async () => {
  repository.findOneBy.mockResolvedValueOnce(mockValue);

  const result = await service.read(1);
  expect(result).toEqual(mockValue);
});

test('update', async () => {
  mockValue.title = 'Blahblahblah';
  mockValue.tags = ['update'];
  repository.update.mockResolvedValueOnce({ raw: '-', affected: 1, generatedMaps: [] });

  const result = await service.update(1, { title: mockValue.title, tags: mockValue.tags });
  expect(result).toHaveProperty('affected', 1);
});

test('delete', async () => {
  repository.delete.mockResolvedValueOnce({ raw: '-', affected: 1 });

  const result = await service.remove(1);
  expect(result).toHaveProperty('affected', 1);
});

afterAll(async () => {
  await moduleRef?.close();
});
