import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User, UserService } from '../shared/user';
import { JwtPayload, Payload } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService, private user: UserService) {}

  public async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.user.fetch(username);

    if (user && user.password === password) {
      const { password: pass, ...result } = user;
      return result;
    }

    return null;
  }

  public signJwt(user: Payload): { access_token: string } {
    const payload: JwtPayload = { sub: user.userId, username: user.username, roles: user.roles };

    return {
      access_token: this.jwt.sign(payload),
    };
  }
}
