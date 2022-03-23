import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import type { JwtPayload, Payload } from '../auth.interface';

@Injectable()
export class JwtVerifyStrategy extends PassportStrategy(Strategy, 'jwt-verify') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true, // Expiration of the access_token is not checked when processing the refresh_token.
      secretOrKey: config.get('jwtSecret'),
    });
  }

  public validate(payload: JwtPayload): Payload {
    return { userId: payload.sub, username: payload.username, roles: payload.roles };
  }
}
