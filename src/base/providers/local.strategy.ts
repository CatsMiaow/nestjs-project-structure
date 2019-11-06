import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { UserService } from '../providers';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly user: UserService) {
    super();
  }

  public async validate(username: string, password: string) {
    try {
      // or Cognito
      const result = await this.user.getUserData(username, password);

      if (!result) {
        throw new UnauthorizedException('InvalidUser');
      }

      // Auth Success
      return {
        id: result.id,
        name: result.name,
        email: result.email,
        roles: result.roles
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
