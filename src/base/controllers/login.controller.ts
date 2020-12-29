import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import type { Request, Response } from 'express';

import { Public, AuthenticatedGuard } from '../../common';
import { LoginGuard } from '../guards';
import { SessionUser } from '../interfaces';

@Controller()
export class LoginController {
  /**
   * https://docs.nestjs.com/techniques/authentication
   * Need username, password in body
   */
  @Public()
  @Post('login')
  @UseGuards(LoginGuard)
  public login(@Req() req: Request): SessionUser | undefined {
    return req.user;
  }

  /**
   * skip guard to @Public when using global guard
   */
  @Public()
  @Get('logout')
  public logout(@Req() req: Request, @Res() res: Response): void {
    req.logout();
    res.redirect('/');
  }

  /**
   * manual guard to @UseGuards when not using global guard
   */
  @Get('check')
  @UseGuards(AuthenticatedGuard)
  public check(@Req() req: Request): SessionUser | undefined {
    return req.user;
  }

  /**
   * 1. http://localhost:3000/login-test?username=test&password=test
   * 2. http://localhost:3000/check
   * 3. http://localhost:3000/logout
   * 4. http://localhost:3000/check
   */
  @Public()
  @Get('login-test')
  @UseGuards(LoginGuard)
  public loginTest(@Req() req: Request): SessionUser | undefined {
    return req.user;
  }
}
