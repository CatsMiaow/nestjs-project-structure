/**
 * https://github.com/nestjs/mapped-types
 * https://docs.nestjs.com/openapi/mapped-types for swagger
 */
import { OmitType } from '@nestjs/mapped-types';
// import { OmitType } from '@nestjs/swagger';

import { CreateDto } from './create.dto';

/**
 * Mapped Types: PartialType, PickType, OmitType, IntersectionType
 */
export class UpdateDto extends OmitType(CreateDto, ['title']) {}
