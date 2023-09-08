import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  NotFoundException,
  InternalServerErrorException,
  ParseIntPipe,
} from '@nestjs/common';

import type { Sampletable1 } from '#entity/sampledb1';
import { CreateDto, UpdateDto } from '../dto';
import { CrudService } from '../providers';

/**
 * route /test/crud/*
 */
@Controller('crud')
export class CrudController {
  constructor(private crud: CrudService) {}

  @Get(':id') // GET http://localhost:3000/test/crud/:id
  public async read(@Param('id', ParseIntPipe) id: number): Promise<Sampletable1> {
    const result = await this.crud.read(id);
    if (!result) {
      throw new NotFoundException('NotFoundData');
    }

    return result;
  }

  @Post() // POST http://localhost:3000/test/crud
  public async create(@Body() body: CreateDto): Promise<{ id: number }> {
    const result = await this.crud.create(body);
    if (!result.id) {
      throw new InternalServerErrorException('NotCreatedData');
    }

    return { id: result.id };
  }

  @Put(':id') // PUT http://localhost:3000/test/crud/:id
  public async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateDto): Promise<{ success: boolean }> {
    const result = await this.crud.update(id, body);

    return { success: !!result.affected };
  }

  @Delete(':id') // DELETE http://localhost:3000/test/crud/:id
  public async remove(@Param('id', ParseIntPipe) id: number): Promise<{ success: boolean }> {
    const result = await this.crud.remove(id);

    return { success: !!result.affected };
  }
}
