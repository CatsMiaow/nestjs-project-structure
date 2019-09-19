import { Injectable } from '@nestjs/common';

import { IUser } from '../interfaces';

@Injectable()
export class UserService {
  public async getUserData(username: string, password: string): Promise<IUser | null> {
    if (!username || !password) {
      return null;
    }

    return {
      id: 'test',
      name: 'foo',
      email: 'bar'
    };
  }
}
