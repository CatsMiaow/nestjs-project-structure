/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NestExpressApplication } from '@nestjs/platform-express';
import { Test } from '@nestjs/testing';
import supertest from 'supertest';

import { AppModule } from '../../src/app.module';

let app: NestExpressApplication | undefined;
let request: supertest.Agent;
let idx: number;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication<NestExpressApplication>();
  await app.init();

  request = supertest(app.getHttpServer());
});

test('POST: /test/crud', async () => {
  const { status, body } = await request.post('/test/crud').send({ title: 'FooBar', content: 'Hello World', tags: ['new'] });

  expect([200, 201]).toContain(status);
  expect(body).toHaveProperty('id');

  idx = body.id;
});

test('GET: /test/crud/:idx', async () => {
  const { body } = await request.get(`/test/crud/${idx}`).expect(200);

  expect(body).toHaveProperty('title', 'FooBar');
});

test('PUT: /test/crud/:idx', async () => {
  const { body } = await request
    .put(`/test/crud/${idx}`)
    .send({ title: 'Blahblahblah', tags: ['update'] })
    .expect(200);

  expect(body).toHaveProperty('success', true);
});

test('DELETE: /test/crud/:idx', async () => {
  const { body } = await request.delete(`/test/crud/${idx}`).expect(200);

  expect(body).toHaveProperty('success', true);
});

afterAll(async () => {
  await app?.close();
});
