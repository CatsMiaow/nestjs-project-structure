/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import type { Type } from '@nestjs/common';

export class ClassRef {
  [index: string]: Type;
}

export type Func = Function;
export type Metatype = Type | Func;

export interface DebugModuleOptions {
  exclude?: string[];
}

export interface DebugOptions {
  context?: string;
  exclude?: Metatype[];
}
