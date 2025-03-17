import { SetMetadata, type CustomDecorator } from '@nestjs/common';

export const Roles = (...roles: string[]): CustomDecorator => SetMetadata('roles', roles);
