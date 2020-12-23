import { SessionUser } from '../src/base/interfaces';

export declare global {
  namespace Express {
    interface Request {
      id: string;
    }
    // tslint:disable-next-line: no-empty-interface
    interface User extends SessionUser {}
  }
}
