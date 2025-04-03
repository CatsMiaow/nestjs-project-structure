import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorResult,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

import { Public } from '../../common';

/**
 * https://docs.nestjs.com/recipes/terminus
 */
@Controller()
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
  ) {}

  @Public()
  @Get('health')
  @HealthCheck()
  public async check(): Promise<HealthCheckResult> {
    return await this.health.check([
      async (): Promise<HealthIndicatorResult> => await this.http.pingCheck('dns', 'https://1.1.1.1'),
      async (): Promise<HealthIndicatorResult> => await this.db.pingCheck('database'),
    ]);
  }
}
