import { applyDecorators, Controller, ControllerOptions } from '@nestjs/common';

import { DebugLog } from '../debug-log.decorator';
import type { Func } from '../debug.interface';

export const LogController = ({ context, ...options }: ControllerOptions & { context?: string }): Func =>
  applyDecorators(DebugLog(context), Controller(options));
