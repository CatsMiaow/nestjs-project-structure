import { Injectable } from '@nestjs/common';

import { SessionUser } from '../interfaces';

@Injectable()
export class UserService {
  public getUserData(username: string, password: string): SessionUser | null {
    if (!username || !password) {
      return null;
    }

    return {
      id: 'test',
      name: 'foo',
      email: 'bar',
      roles: [], // ['admin', 'etc', ...]
    };
  }
}
