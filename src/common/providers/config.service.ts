import { Injectable } from '@nestjs/common';
import config, { IUtil } from 'config';

/**
 * https://docs.nestjs.com/techniques/configuration
 */
@Injectable()
export class ConfigService {
  public readonly util: IUtil = config.util;

  public get(key: string): string {
    return config.get(key);
  }
}
