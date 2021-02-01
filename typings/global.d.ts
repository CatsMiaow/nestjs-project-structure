import { Payload } from '../src/auth';

export declare global {
  namespace Express {
    interface Request {
      id: string;
    }
    // tslint:disable-next-line: no-empty-interface
    interface User extends Payload {}
  }
}
