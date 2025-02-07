import { SetMetadata, type CustomDecorator } from '@nestjs/common';

import { DEBUG_METADATA } from './debug.constant.js';
import type { DebugOptions } from './debug.interface.js';

export const Debug = (options?: string | DebugOptions): CustomDecorator =>
  SetMetadata(DEBUG_METADATA, { context: options, ...(typeof options === 'object' && options) });
