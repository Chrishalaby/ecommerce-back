import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Attribute } from 'src/entities/attribute.entity';
import { AttributeService } from './attribute.service';

// @UseGuards(JwtAuthGuard)
@Controller('attribute')
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}

  @Get()
  findAll(): Promise<Attribute[]> {
    return this.attributeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Attribute> {
    return this.attributeService.findOne(id);
  }

  @Post()
  create(@Body() attribute: Attribute): Promise<Attribute> {
    return this.attributeService.create(attribute);
  }

  // @Put(':id')
  // update(
  //   @Param('id') id: number,
  //   @Body() attribute: Partial<Attribute>,
  // ): Promise<Attribute> {
  //   return this.attributeService.update(id, attribute);
  // }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.attributeService.delete(id);
  }

  @Post('update')
  updateAttribute(@Body() attributeUpdate: Attribute): Promise<Attribute> {
    return this.attributeService.updateAttribute(attributeUpdate);
  }
}
