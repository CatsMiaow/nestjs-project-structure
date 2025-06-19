/* eslint-disable @typescript-eslint/no-unsafe-assignment, new-cap */
import type { NestExpressApplication } from '@nestjs/platform-express';
import { Test } from '@nestjs/testing';
import supertest from 'supertest';

import { middleware } from '../../src/app.middleware';
import { AppModule } from '../../src/app.module';

let app: NestExpressApplication | undefined;
let request: supertest.Agent;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication<NestExpressApplication>();
  // https://docs.nestjs.com/fundamentals/lifecycle-events
  // Error: passport.initialize() middleware not in use
  middleware(app);
  await app.init();

  // https://github.com/visionmedia/supertest/issues/46#issuecomment-58534736
  request = new supertest.agent(app.getHttpServer());
});

test('POST: /login', async () => {
  // eslint-disable-next-line sonarjs/no-hardcoded-passwords
  const { status, body } = await request.post('/login').send({ username: 'foobar', password: 'crypto' });

  expect([200, 201]).toContain(status);
  expect(body).toHaveProperty('username', 'foobar');
});

test('GET: /check', async () => {
  const { body } = await request.get('/check').expect(200);

  expect(body).toHaveProperty('userId', 'test');
});

test('GET: /logout', async () => {
  await request.get('/logout').expect(302);
  await request.get('/check').expect(403);
});

afterAll(async () => {
  await app?.close();
});
