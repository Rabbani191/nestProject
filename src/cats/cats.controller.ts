import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { CreateCatDto, ListAllEntitiesDto, UpdateCatDto } from './dtos';
import { CatsService } from './services/cats.service';
import { Cat, ApiResponse } from './interfaces';

@Controller('cats')
export class CatsController {
  constructor(private catservice: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto): ApiResponse<Cat> {
    console.log('in create controller ', createCatDto);
    return this.catservice.createCat(createCatDto);
  }

  @Get()
  findAll(@Query() query: ListAllEntitiesDto): ApiResponse<Cat[]> {
    return this.catservice.findAllCats(query.offset, query.limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string): ApiResponse<Cat> {
    return this.catservice.findCat(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCatDto: UpdateCatDto,
  ): ApiResponse<Cat> {
    return this.catservice.updateCat(id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): ApiResponse<Cat[]> {
    return this.catservice.deleteCat(id);
  }
}
