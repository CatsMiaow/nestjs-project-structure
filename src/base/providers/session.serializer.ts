import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { SessionUser } from '../interfaces';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  public serializeUser(user: SessionUser, done: (err: Error | null, data?: SessionUser) => void): void {
    done(null, user);
  }

  public deserializeUser(data: SessionUser, done: (err: Error | null, user?: SessionUser) => void): void {
    try {
      // more
      // const user = await fetchUser();
      done(null, data);
    } catch (err) {
      done(err);
    }
  }
}
