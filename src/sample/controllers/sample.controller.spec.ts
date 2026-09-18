import { Test, type TestingModule } from '@nestjs/testing';
import { getLoggerToken, type PinoLogger } from 'nestjs-pino';
import { mockDeep } from 'vitest-mock-extended';

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
      get: vi.fn((key: keyof typeof config) => config[key]),
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
