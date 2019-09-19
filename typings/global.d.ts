import { IUser } from "../src/base/interfaces";

declare global {
  namespace Express {
    // tslint:disable-next-line: no-empty-interface
    interface User extends IUser {}
  }
}
