import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep, type DeepMockProxy } from 'jest-mock-extended';

import { Sampletable1 } from '#entity/sampledb1';
import { CrudController } from './crud.controller';
import { CrudService } from '../providers';

let moduleRef: TestingModule | undefined;
let controller: CrudController;
let service: DeepMockProxy<CrudService>;
let mockValue: Sampletable1;

beforeAll(async () => {
  moduleRef = await Test.createTestingModule({
    controllers: [CrudController],
    providers: [CrudService],
  })
    .overrideProvider(CrudService)
    .useValue(mockDeep<CrudService>())
    .compile();

  controller = moduleRef.get(CrudController);
  service = moduleRef.get(CrudService);
});

test('create', async () => {
  const data = { title: 'FooBar', content: 'Hello World', tags: ['new'] };
  mockValue = { id: 1, ...data, created_at: new Date(), updated_at: new Date() };
  service.create.mockResolvedValue(mockValue);

  const result = await controller.create(data);
  expect(result).toHaveProperty('id', 1);
});

test('read', async () => {
  service.read.mockResolvedValue(mockValue);

  const result = await controller.read(1);
  expect(result).toEqual(mockValue);
});

test('update', async () => {
  mockValue.title = 'Blahblahblah';
  mockValue.tags = ['update'];
  service.update.mockResolvedValue({ raw: '-', affected: 1, generatedMaps: [] });

  const result = await controller.update(1, { content: mockValue.title, tags: mockValue.tags });
  expect(result).toHaveProperty('success', true);
});

test('delete', async () => {
  service.remove.mockResolvedValue({ raw: '-', affected: 1 });

  const result = await controller.remove(1);
  expect(result).toHaveProperty('success', true);
});

afterAll(async () => {
  await moduleRef?.close();
});
