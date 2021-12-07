import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import supertest, { SuperTest, Test as AgentTest } from 'supertest';

import { AppModule } from '../../src/app.module';

let app: INestApplication;
let request: SuperTest<AgentTest>;
let token: string;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication();
  await app.init();

  request = supertest.agent(app.getHttpServer());
});

test('POST: /jwt/login', async () => {
  const { status, body } = await request.post('/jwt/login')
    .send({ username: 'foobar', password: 'crypto' });

  expect([200, 201]).toContain(status);
  expect(body).toHaveProperty('access_token');
  token = body.access_token;
});

test('GET: /jwt/check', async () => {
  const { body } = await request.get('/jwt/check')
    .set('Authorization', `Bearer ${token}`)
    .expect(200);

  expect(body).toHaveProperty('username', 'foobar');
});

afterAll(async () => {
  await app?.close();
});
