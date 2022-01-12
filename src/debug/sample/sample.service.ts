import { Injectable } from '@nestjs/common';

@Injectable()
export class SampleService {
  public stepOne(foo: string): string {
    return foo;
  }

  public stepTwo(bar: string): string {
    return bar;
  }

  public stepThree(): string {
    return 'step3';
  }

  public stepStart(): string {
    return this.stepChainOne();
  }

  public stepChainOne(): string {
    return this.stepChainTwo();
  }

  public stepChainTwo(): string {
    return this.stepChainThree();
  }

  public stepChainThree(): string {
    return this.stepChainFour();
  }

  public stepChainFour(): string {
    return 'OK';
  }
}
