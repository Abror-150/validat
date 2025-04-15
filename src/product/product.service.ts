import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private product: Model<Product>) {}
  async create(createProductDto: CreateProductDto) {
    let data = await this.product.create(createProductDto);
    return data;
  }

  async findAll(page: number, limit: number, sort: string, filter: string) {
    const offset = (page - 1) * limit;

    const where: any = {};
    if (filter) {
      where.name = { $regex: filter, $options: 'i' };
    }

    const sortOrder = sort === 'asc' ? 1 : -1;

    const data = await this.product
      .find(where)
      .skip(offset)
      .limit(limit)
      .sort({ name: sortOrder });

    return data;
  }

  async findOne(id: string) {
    let data = await this.product.findById(id);
    return data;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    let data = await this.product.findByIdAndUpdate(id, updateProductDto, {
      new: true,
    });
    return data;
  }

  async remove(id: string) {
    let data = await this.product.findByIdAndDelete(id);
    return data;
  }
}
