import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import type { JwtPayload, JwtSign, Payload } from './auth.interface';
import { User, UserService } from '../shared/user';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private user: UserService,
    private config: ConfigService,
  ) {}

  public async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.user.fetch(username);

    if (user.password === password) {
      const { password: pass, ...result } = user;
      return result;
    }

    return null;
  }

  public validateRefreshToken(data: Payload, refreshToken: string): boolean {
    if (!this.jwt.verify(refreshToken, { secret: this.config.get('jwtRefreshSecret') })) {
      return false;
    }

    const payload = this.jwt.decode<{ sub: string }>(refreshToken);
    return payload.sub === data.userId;
  }

  public jwtSign(data: Payload): JwtSign {
    const payload: JwtPayload = { sub: data.userId, username: data.username, roles: data.roles };

    return {
      access_token: this.jwt.sign(payload),
      refresh_token: this.getRefreshToken(payload.sub),
    };
  }

  public getPayload(token: string): Payload | null {
    try {
      const payload = this.jwt.decode<JwtPayload | null>(token);
      if (!payload) {
        return null;
      }

      return { userId: payload.sub, username: payload.username, roles: payload.roles };
    } catch {
      // Unexpected token i in JSON at position XX
      return null;
    }
  }

  private getRefreshToken(sub: string): string {
    return this.jwt.sign(
      { sub },
      {
        secret: this.config.get('jwtRefreshSecret'),
        expiresIn: '7d', // Set greater than the expiresIn of the access_token
      },
    );
  }
}
