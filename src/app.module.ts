import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'config/typeorm.config';
import { AttributeModule } from './modules/attribute/attribute.module';
import { ProductsModule } from './modules/product/products.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ProductsModule,
    AttributeModule,
  ],
  // providers: [AppService],
})
export class AppModule {}
