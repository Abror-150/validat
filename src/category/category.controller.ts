import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('category')
export class CategoryController {
  constructor(private readonly category: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.category.create(createCategoryDto);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'filter', required: false })
  @ApiQuery({ name: 'sort', required: false })
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('filter') filter: string,
    @Query('sort') sort: string,
  ) {
    return this.category.findAll(page, limit, filter, sort);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.category.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.category.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.category.remove(id);
  }
}
