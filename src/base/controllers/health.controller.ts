import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  type HealthCheckResult,
  HealthCheckService,
  type HealthIndicatorResult,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

import { Public } from '../../common/index.js';

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
    return this.health.check([
      async (): Promise<HealthIndicatorResult> => this.http.pingCheck('dns', 'https://1.1.1.1'),
      async (): Promise<HealthIndicatorResult> => this.db.pingCheck('database'),
    ]);
  }
}
