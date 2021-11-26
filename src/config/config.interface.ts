import type { PathImpl2 } from '@nestjs/config';

import type { config as base } from './envs/default';
import type { config as production } from './envs/production';

export type Objectype = Record<string, unknown>;
export type Default = typeof base;
export type Production = typeof production;
export type Config = Default & Production;

// https://github.com/nestjs/config/issues/752
export type Path<T> = PathImpl2<T> extends string | keyof T ? PathImpl2<T> : keyof T;
export type PathValue<T, P extends Path<T>> = P extends `${infer Key}.${infer Rest}` ? Key extends keyof T ? Rest extends Path<T[Key]> ? PathValue<T[Key], Rest> : never : never : P extends keyof T ? T[P] : never;
