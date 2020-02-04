import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { Public } from '../../common/decorators';
import { AuthenticatedGuard } from '../../common/guards';
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
}
