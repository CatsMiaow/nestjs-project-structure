import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';
import { getLoggerToken, type PinoLogger } from 'nestjs-pino';

import { SampleController } from './sample.controller';
import { ConfigService } from '../../common';

let moduleRef: TestingModule | undefined;
let controller: SampleController;

const config = {
  hello: 'world',
  foo: 'bar',
};

beforeAll(async () => {
  moduleRef = await Test.createTestingModule({
    controllers: [SampleController],
    providers: [
      {
        provide: getLoggerToken(SampleController.name),
        useValue: mockDeep<PinoLogger>(),
      },
      ConfigService,
    ],
  })
    .overrideProvider(ConfigService)
    .useValue({
      get: jest.fn((key: keyof typeof config) => config[key]),
    })
    .useMocker(mockDeep)
    .compile();

  controller = moduleRef.get(SampleController);
});

test('sample', () => {
  expect(controller.sample()).toEqual(config);
});

afterAll(async () => {
  await moduleRef?.close();
});
