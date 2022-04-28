import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Product } from './dto/product.model';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private service: ProductsService) {}

  @Post()
  async create(@Body() product: CreateProductDto) {
    const id = await this.service.create(product);
    return { id: id };
  }

  @Get()
  async getAllProducts() {
    return await this.service.getProducts();
  }

  @Get('/:id')
  async getProduct(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Patch('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const updatedProductId = await this.service.update(id, updateProductDto);
    return {
      id: updatedProductId
    }
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
