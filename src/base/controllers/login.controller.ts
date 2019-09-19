import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { Public } from '../../common/decorators';
import { AuthenticatedGuard } from '../../common/guards';
import { LoginGuard } from '../guards';

@Controller()
export class LoginController {

  /**
   * https://docs.nestjs.com/techniques/authentication
   * Need username, password in body
   */
  @Public()
  @Post('login')
  @UseGuards(LoginGuard)
  public login(@Req() req: Request) {
    return req.user;
  }

  /**
   * skip guard to @Public when using global guard
   */
  @Public()
  @Get('logout')
  public logout(@Req() req: Request, @Res() res: Response) {
    req.logout();
    res.redirect('/');
  }

  /**
   * manual guard to @UseGuards when not using global guard
   */
  @Get('check')
  @UseGuards(AuthenticatedGuard)
  public check(@Req() req: Request) {
    return req.user;
  }
}
