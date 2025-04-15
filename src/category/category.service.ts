import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private category: Model<Category>) {}
  async create(createCategoryDto: CreateCategoryDto) {
    let data = await this.category.create(createCategoryDto);
    return data;
  }

  async findAll(page: number, limit: number, sort: string, filter: string) {
    const offset = (page - 1) * limit;

    const where: any = {};
    if (filter) {
      where.name = { $regex: filter, $options: 'i' };
    }

    const sortOrder = sort === 'asc' ? 1 : -1;

    const data = await this.category
      .find(where)
      .skip(offset)
      .limit(limit)
      .sort({ name: sortOrder });

    return data;
  }

  async findOne(id: string) {
    let data = await this.category.findById(id);
    return data;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    let data = await this.category.findByIdAndUpdate(id, updateCategoryDto, {
      new: true,
    });
    return data;
  }

  async remove(id: string) {
    let data = await this.category.findByIdAndDelete(id);
    return data;
  }
}
