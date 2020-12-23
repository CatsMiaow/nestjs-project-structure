import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { UserService } from '.';
import { SessionUser } from '../interfaces';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private user: UserService) {
    super();
  }

  public validate(username: string, password: string): SessionUser {
    try {
      // or Cognito
      const result = this.user.getUserData(username, password);

      if (!result) {
        throw new UnauthorizedException('InvalidUser');
      }

      // Auth Success
      return {
        id: result.id,
        name: result.name,
        email: result.email,
        roles: result.roles,
      };
    } catch (err) {
      if (err.code) {
        // Auth Failed
        throw new UnauthorizedException(err.code);
      } else {
        // Auth Error
        throw err;
      }
    }
  }
}
