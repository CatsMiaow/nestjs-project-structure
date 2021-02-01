import { Controller, Get, Post, UseGuards, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';

import { AuthService, LocalLoginGuard, Payload, AuthenticatedGuard, LocalAuthGuard, JwtAuthGuard } from '../../auth';
import { ReqUser } from '../../common';

/**
 * https://docs.nestjs.com/techniques/authentication
 */
@Controller()
export class AuthController {
  constructor(private auth: AuthService) {}

  /**
   * See test/e2e/local-auth.spec.ts
   * need username, password in body
   * skip guard to @Public when using global guard
   */
  @Post('login')
  @UseGuards(LocalLoginGuard)
  public login(@Req() req: Request): Payload | undefined {
    return req.user;
  }

  @Get('logout')
  public logout(@Req() req: Request, @Res() res: Response): void {
    req.logout();
    res.redirect('/');
  }

  @Get('check')
  @UseGuards(AuthenticatedGuard)
  public check(@ReqUser() user: Payload): Payload | undefined {
    return user;
  }

  /**
   * See test/e2e/jwt-auth.spec.ts
   */
  @UseGuards(LocalAuthGuard)
  @Post('jwt/login')
  public jwtLogin(@Req() req: Request): { access_token: string } {
    return this.auth.signJwt(<Payload>req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('jwt/check')
  public jwtCheck(@ReqUser() user: Payload): Payload | undefined {
    return user;
  }
}
