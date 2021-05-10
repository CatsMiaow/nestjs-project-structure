import { OmitType } from '@nestjs/mapped-types';

import { CreateDto } from './create.dto';

/**
 * https://github.com/nestjs/mapped-types
 * PartialType, PickType, OmitType, IntersectionType
 * https://docs.nestjs.com/openapi/mapped-types for swagger
 */
export class UpdateDto extends OmitType(CreateDto, ['title']) {}
