import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfig, Path as NestPath } from '@nestjs/config';

import type { Config, Path, PathValue } from '../../config';

@Injectable()
export class ConfigService<K = Config> extends NestConfig<K> {
  public override get<P extends Path<K>>(path: P): PathValue<K, P> {
    const value = super.get(<NestPath<K>><unknown>path, { infer: true });

    if (value === undefined) {
      throw new Error(`NotFoundConfig: ${path}`);
    }

    return <PathValue<K, P>>value;
  }
}
