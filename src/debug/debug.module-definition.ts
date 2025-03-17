import { ConfigurableModuleBuilder } from '@nestjs/common';

import type { DebugModuleOptions } from './debug.interface.js';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE } = new ConfigurableModuleBuilder<DebugModuleOptions>()
  .setClassMethodName('forRoot')
  .build();
