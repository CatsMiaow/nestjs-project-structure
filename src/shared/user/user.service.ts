import { Injectable } from '@nestjs/common';

import type { User } from './user.interface';

@Injectable()
export class UserService {
  public async fetch(username: string): Promise<User & { password: string }> {
    return await Promise.resolve({
      id: 'test',
      // eslint-disable-next-line sonarjs/no-hardcoded-passwords
      password: 'crypto',
      name: username,
      email: `${username}@test.com`,
      roles: ['test'], // ['admin', 'etc', ...]
    });
  }
}
