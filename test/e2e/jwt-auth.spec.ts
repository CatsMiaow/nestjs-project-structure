/* eslint-disable @typescript-eslint/no-unsafe-assignment, new-cap, sonarjs/new-cap, sonarjs/no-hardcoded-credentials  */
import type { NestExpressApplication } from '@nestjs/platform-express';
import { Test } from '@nestjs/testing';
import supertest from 'supertest';

import { AppModule } from '../../src/app.module';

let app: NestExpressApplication | undefined;
let request: supertest.Agent;
let accessToken: string;
let refreshToken: string;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication<NestExpressApplication>();
  await app.init();

  request = new supertest.agent(app.getHttpServer());
});

test('POST: /jwt/login', async () => {
  // eslint-disable-next-line sonarjs/no-hardcoded-passwords
  const { status, body } = await request.post('/jwt/login').send({ username: 'foobar', password: 'crypto' });

  expect([200, 201]).toContain(status);
  expect(body).toHaveProperty('access_token');
  accessToken = body.access_token;
  refreshToken = body.refresh_token;
});

test('GET: /jwt/check', async () => {
  const { body } = await request.get('/jwt/check').set('Authorization', `Bearer ${accessToken}`).expect(200);

  expect(body).toHaveProperty('username', 'foobar');
});

test('POST: /jwt/refresh', async () => {
  const { status, body } = await request
    .post('/jwt/refresh')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({ refresh_token: refreshToken });

  expect([200, 201]).toContain(status);
  expect(body).toEqual({
    access_token: expect.any(String),
    refresh_token: expect.any(String),
  });
});

afterAll(async () => {
  await app?.close();
});
