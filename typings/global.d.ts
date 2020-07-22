/* eslint-disable */
// https://github.com/typescript-eslint/typescript-eslint/issues/1856
import { SessionUser } from '../src/base/interfaces';

declare global {
  namespace Express {
    // tslint:disable-next-line: no-empty-interface
    interface User extends SessionUser {}
  }
}
