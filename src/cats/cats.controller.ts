import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Put,
  Query,
  ParseIntPipe,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import {
  CreateCatDto,
  ListAllEntitiesDto,
  ListAllEntitiesSchema,
  UpdateCatDto,
  createCatSchema,
} from './dtos';
import { CatsService } from './services/cats.service';
import { Cat, ApiResponse } from './interfaces';
import { JoiValidationPipe } from './validators/validation.pipe';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';

@Controller('cats')
export class CatsController {
  constructor(
    private catservice: CatsService,
    private joiValidationPipe: JoiValidationPipe,
  ) {}

  @Post()
  @Roles('admin','user')
  @UseGuards( RolesGuard)
  @UsePipes(new JoiValidationPipe(createCatSchema))
  create(@Body() createCatDto: CreateCatDto): ApiResponse<Cat> {
    console.log('in create controller ', createCatDto);
    return this.catservice.createCat(createCatDto);
  }

  @Get()
  @UsePipes(new JoiValidationPipe(ListAllEntitiesSchema))
  findAll(@Query() query: ListAllEntitiesDto): ApiResponse<Cat[]> {
    return this.catservice.findAllCats(query.offset, query.limit);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string): ApiResponse<Cat> {
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
