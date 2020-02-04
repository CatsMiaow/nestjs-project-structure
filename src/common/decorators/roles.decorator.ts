import { SetMetadata, CustomDecorator } from '@nestjs/common';

export const Roles = (...roles: string[]): CustomDecorator<string> => SetMetadata('roles', roles);
