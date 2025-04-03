import { SetMetadata, type CustomDecorator } from '@nestjs/common';

export const Public = (): CustomDecorator => SetMetadata('isPublic', true);
