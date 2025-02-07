import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfig, type Path, type PathValue } from '@nestjs/config';

import type { Config } from '../../config/index.js';

@Injectable()
export class ConfigService<K = Config> extends NestConfig<K> {
  public override get<P extends Path<K>>(path: P): PathValue<K, P> {
    const value = super.get(path, { infer: true });

    if (value === undefined) {
      throw new Error(`NotFoundConfig: ${path}`);
    }

    return value;
  }
}
