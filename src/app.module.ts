import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'config/typeorm.config';
import { join } from 'path';
import { AttributeModule } from './modules/attribute/attribute.module';
import { ProductsModule } from './modules/product/products.module';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads/',
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    ProductsModule,
    AttributeModule,
  ],
  // providers: [AppService],
})
export class AppModule {}
