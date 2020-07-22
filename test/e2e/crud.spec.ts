import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '../../src/app.module';

let app: INestApplication;
let httpServer: unknown;
let idx: number;

beforeAll(async () => {
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();

  httpServer = app.getHttpServer();
});

test('POST: /test/crud', async () => {
  const { status, body } = await request(httpServer)
    .post('/test/crud')
    .send({ title: 'FooBar', content: 'Hello World' });

  expect([200, 201]).toContain(status);
  expect(body).toHaveProperty('id');

  idx = body.id;
});

test('GET: /test/crud/:idx', async () => {
  const { body } = await request(httpServer)
    .get(`/test/crud/${idx}`)
    .expect(200);

  expect(body).toHaveProperty('title', 'FooBar');
});

test('PUT: /test/crud/:idx', async () => {
  const { body } = await request(httpServer)
    .put(`/test/crud/${idx}`)
    .send({ title: 'Blahblahblah' })
    .expect(200);

  expect(body).toHaveProperty('success', true);
});

test('DELETE: /test/crud/:idx', async () => {
  const { body } = await request(httpServer)
    .delete(`/test/crud/${idx}`)
    .expect(200);

  expect(body).toHaveProperty('success', true);
});

afterAll(async () => {
  await app.close();
});
