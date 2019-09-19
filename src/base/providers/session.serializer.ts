import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { IUser } from '../interfaces';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  public serializeUser(user: IUser, done: (err: Error | null, data?: IUser) => void) {
    done(null, user);
  }
  public deserializeUser(data: IUser, done: (err: Error | null, user?: IUser) => void) {
    try {
      // more
      // const user = await fetchUser();
      done(null, data);
    } catch (err) {
      done(err);
    }
  }
}
