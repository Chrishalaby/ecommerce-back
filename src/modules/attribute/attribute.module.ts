import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attribute, AttributeValue } from 'src/entities/attribute.entity';
import { AttributeController } from './attribute.controller';
import { AttributeService } from './attribute.service';

@Module({
  imports: [TypeOrmModule.forFeature([Attribute, AttributeValue])],
  controllers: [AttributeController],
  providers: [AttributeService],
})
export class AttributeModule {}
