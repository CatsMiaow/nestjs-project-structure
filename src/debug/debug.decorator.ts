import { SetMetadata, CustomDecorator } from '@nestjs/common';

import { DEBUG_METADATA } from './debug.constant';
import type { DebugOptions } from './debug.interface';

export const Debug = (options?: string | DebugOptions): CustomDecorator => (
  SetMetadata(DEBUG_METADATA, { context: options, ...(typeof options === 'object' && options) })
);
