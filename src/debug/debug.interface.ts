import type { Type } from '@nestjs/common';

export class ClassRef {
  [index: string]: Type;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type Metatype = Type | Function;

export interface DebugOptions {
  context?: string;
  exclude?: Metatype[];
}
