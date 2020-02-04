// https://github.com/typescript-eslint/typescript-eslint/issues/1479
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SessionUser } from '../src/base/interfaces';

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends SessionUser {}
  }
}
