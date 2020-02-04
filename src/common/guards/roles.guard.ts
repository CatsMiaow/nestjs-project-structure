import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean {
    const roles = [
      // Controller Roles
      ...(this.reflector.get<string[]>('roles', context.getClass()) || []),
      // Method Roles
      ...(this.reflector.get<string[]>('roles', context.getHandler()) || []),
    ];
    if (roles.length < 1) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const { user } = request;
    if (!user) {
      return false;
    }

    return user.roles.some((role: string) => roles.includes(role));
  }
}
