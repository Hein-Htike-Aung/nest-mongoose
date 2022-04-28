import { Get, Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { title } from 'process';
import { Product } from './dto/product.model';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async create({ title, description, price }) {
    const newProduct = new this.productModel({
      title,
      description,
      price,
    });

    const result = await newProduct.save();

    return result.id;
  }

  async update(id: string, dto: UpdateProductDto) {
    let storedProduct = await this.findProduct(id);

    if (dto.title) {
      storedProduct.title = dto.title;
    }
    if (dto.description) {
      storedProduct.description = dto.description;
    }
    if (dto.price) {
      storedProduct.price = dto.price;
    }

    const result = await storedProduct.save();
    return result.id;
  }

  async delete(id: string) {

    await this.findProduct(id);

    await this.productModel.deleteOne({ _id: id }).exec();

    return {
      deleted: true,
    };
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    return products.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      price: p.price,
    }));
  }

  async findOne(id: string) {
    const product = await this.findProduct(id);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  private async findProduct(id: string): Promise<Product> {
    try {
      const product = await this.productModel.findById(id).exec();

      return product;
    } catch (error) {
      throw new NotFoundException('Count not find Product');
    }
  }
}
