import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import supertest, { SuperTest, Test as AgentTest } from 'supertest';

import { AppModule } from '../../src/app.module';

let app: INestApplication;
let request: SuperTest<AgentTest>;
let idx: number;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication();
  await app.init();

  request = supertest(app.getHttpServer());
});

test('POST: /test/crud', async () => {
  const { status, body } = await request.post('/test/crud')
    .send({ title: 'FooBar', content: 'Hello World' });

  expect([200, 201]).toContain(status);
  expect(body).toHaveProperty('id');

  idx = body.id;
});

test('GET: /test/crud/:idx', async () => {
  const { body } = await request.get(`/test/crud/${idx}`)
    .expect(200);

  expect(body).toHaveProperty('title', 'FooBar');
});

test('PUT: /test/crud/:idx', async () => {
  const { body } = await request.put(`/test/crud/${idx}`)
    .send({ title: 'Blahblahblah' })
    .expect(200);

  expect(body).toHaveProperty('success', true);
});

test('DELETE: /test/crud/:idx', async () => {
  const { body } = await request.delete(`/test/crud/${idx}`)
    .expect(200);

  expect(body).toHaveProperty('success', true);
});

afterAll(async () => {
  await app?.close();
});
