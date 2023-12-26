/* eslint-disable @typescript-eslint/no-unsafe-assignment, new-cap  */
import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import type { Express } from 'express';
import supertest from 'supertest';

import { AppModule } from '../../src/app.module';

let app: INestApplication<Express> | undefined;
let request: supertest.Agent;
let accessToken: string;
let refreshToken: string;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication();
  await app.init();

  request = new supertest.agent(app.getHttpServer());
});

test('POST: /jwt/login', async () => {
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
