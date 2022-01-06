import { Injectable, Type } from '@nestjs/common';
import { MODULE_METADATA } from '@nestjs/common/constants';
import { DiscoveryService, Reflector } from '@nestjs/core';
import type { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';

import { DebugLog } from './debug-log.decorator';
import { DEBUG_METADATA } from './debug.constant';
import type { DebugOptions, Metatype } from './debug.interface';

@Injectable()
export class DebugExplorer {
  private exclude: Set<string> = new Set(['Logger', 'ConfigService']);

  constructor(
    private discoveryService: DiscoveryService,
    private reflector: Reflector,
  ) {
    const instanceWrappers: InstanceWrapper[] = [
      ...this.discoveryService.getControllers(),
      ...this.discoveryService.getProviders(),
    ];

    for (const wrapper of instanceWrappers.filter((wrap: InstanceWrapper) => !wrap.isNotMetatype)) {
      const { instance, metatype } = wrapper;
      if (!instance || !Object.getPrototypeOf(instance)) {
        continue;
      }

      const metadata = this.reflector.get<DebugOptions>(DEBUG_METADATA, metatype);
      if (!metadata) {
        continue;
      }

      this.applyDecorator(metatype, metadata);
    }
  }

  private applyDecorator(metatype: Metatype, metadata: DebugOptions): void {
    const instanceMetatypes: Type[] = [
      ...(this.reflector.get(MODULE_METADATA.CONTROLLERS, metatype) || []),
      ...(this.reflector.get(MODULE_METADATA.PROVIDERS, metatype) || []),
    ];

    for (const meta of instanceMetatypes) {
      if (typeof meta !== 'function' || this.exclude.has(meta.name) || metadata.exclude?.includes(meta)) {
        continue;
      }

      this.exclude.add(meta.name);
      DebugLog(metadata.context)(meta);
    }

    const imports = this.reflector.get<Type[]>('imports', metatype) || [];
    for (const module of imports) {
      this.applyDecorator(module, metadata);
    }
  }
}
