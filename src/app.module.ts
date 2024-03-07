import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Add this line
import { typeOrmConfig } from 'config/typeorm.config';
import { ProductsModule } from './modules/product/products.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { typeOrmConfig } from './config/typeorm.config';
@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ProductsModule],
  // providers: [AppService],
})
export class AppModule {}
