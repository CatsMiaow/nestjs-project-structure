import { Controller, Get } from '@nestjs/common';

import { Public } from '../../common/decorators';

/**
 * https://docs.nestjs.com/recipes/terminus
 */
@Controller()
export class HealthController {

  @Public()
  @Get('health')
  public health() {
    return 'OK';
  }
}
