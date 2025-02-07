import { applyDecorators, Controller, type ControllerOptions } from '@nestjs/common';

import { DebugLog } from '../debug-log.decorator.js';
import type { Func } from '../debug.interface.js';

export const LogController = ({ context, ...options }: ControllerOptions & { context?: string }): Func =>
  applyDecorators(DebugLog(context), Controller(options));
