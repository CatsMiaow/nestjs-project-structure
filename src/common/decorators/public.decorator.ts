import { SetMetadata, CustomDecorator } from '@nestjs/common';

export const Public = (): CustomDecorator<string> => SetMetadata('isPublic', true);
