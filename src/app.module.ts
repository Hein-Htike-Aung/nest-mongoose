import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cluster0.itowd.mongodb.net/nestjs?retryWrites=true&w=majority',
    ),
  ],
})
export class AppModule {}
