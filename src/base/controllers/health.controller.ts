import { Controller, Get } from '@nestjs/common';

import { Public } from '../../common';

/**
 * https://docs.nestjs.com/recipes/terminus
 */
@Controller()
export class HealthController {
  @Public()
  @Get('health')
  public health(): string {
    return 'OK';
  }
}
