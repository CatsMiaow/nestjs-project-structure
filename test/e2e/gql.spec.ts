import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import supertest, { SuperTest, Test as AgentTest } from 'supertest';

import { AppModule } from '../../src/app.module';

// https://www.apollographql.com/docs/apollo-server/testing/testing/
// As another alternative, can use apollo-server-testing instead of supertest

const gql = String.raw; // for highlighting
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

test('User', async () => {
  const { status, body: login } = await request.post('/jwt/login')
    .send({ username: 'foobar', password: 'crypto' });

  expect([200, 201]).toContain(status);
  expect(login).toHaveProperty('access_token');

  const { body } = await request.post('/graphql')
    .set('Authorization', `Bearer ${login.access_token}`)
    .send({ query: gql`
      query Payload {
        user {
          username
        }
      }`,
    }).expect(200);

  expect(body).toHaveProperty('data.user.username', 'foobar');
});

test('Write', async () => {
  const { body } = await request.post('/graphql').send({
    query: gql`
      mutation Write($data: SimpleInput!) {
        create(simpleData: $data) {
          id
          title
          content
          tags
        }
      }
    `,
    variables: {
      data: {
        title: 'foo',
        content: 'bar',
        tags: 'test',
      },
    },
  }).expect(200);

  expect(body).toHaveProperty('data.create.id');

  idx = body.data.create.id;
});

test('Read', async () => {
  const { body } = await request.post('/graphql').send({
    query: gql`
      query Read($id: ID!) {
        read(id: $id) {
          title
          createdAt
        }
      }
    `,
    variables: {
      id: idx,
    },
  }).expect(200);

  expect(body).toHaveProperty('data.read.title', 'foo');
});

test('Find', async () => {
  const { body } = await request.post('/graphql').send({
    query: gql`
      query Find($title: String!, $content: String) {
        find(title: $title, content: $content) {
          id
          title
          content
          tags
          createdAt
        }
      }
    `,
    variables: {
      title: 'foo',
    },
  }).expect(200);

  expect(body).toHaveProperty('data.find');
  expect(body.data.find).toContainEqual(
    expect.objectContaining({
      title: expect.any(String),
      createdAt: expect.any(String),
    }),
  );
});

test('Remove', async () => {
  const { body } = await request.post('/graphql').send({
    query: gql`
      mutation Remove($id: ID!) {
        remove(id: $id)
      }
    `,
    variables: {
      id: idx,
    },
  }).expect(200);

  expect(body).toHaveProperty('data.remove', true);
});

afterAll(async () => {
  await app?.close();
});
