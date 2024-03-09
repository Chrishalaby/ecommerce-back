import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAttributeDto } from 'src/dto/create-attribute.dto';
import { Attribute, AttributeValue } from 'src/entities/attribute.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AttributeService {
  constructor(
    @InjectRepository(Attribute)
    private attributeRepository: Repository<Attribute>,

    @InjectRepository(AttributeValue)
    private attributeValueRepository: Repository<AttributeValue>,
  ) {}

  async findAll(): Promise<Attribute[]> {
    return this.attributeRepository.find({ relations: ['values'] });
  }

  async findOne(id: number): Promise<Attribute> {
    return this.attributeRepository.findOne({
      where: { id },
      relations: ['values'],
    });
  }

  async create(createAttributeDto: CreateAttributeDto): Promise<Attribute> {
    const attribute = new Attribute();
    attribute.name = createAttributeDto.name;

    if (createAttributeDto.values) {
      attribute.values = createAttributeDto.values.map((valueDto) => {
        const attributeValue = new AttributeValue();
        attributeValue.value = valueDto.value;
        return attributeValue;
      });
    }

    return this.attributeRepository.save(attribute);
  }

  async update(id: number, attribute: Partial<Attribute>): Promise<Attribute> {
    await this.attributeRepository.update(id, attribute);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.attributeRepository.delete(id);
  }

  async updateAttribute(attributeUpdate: Attribute): Promise<Attribute> {
    // Optionally update the Attribute's basic information
    let attribute = await this.attributeRepository.findOneBy({
      id: attributeUpdate.id,
    });
    if (!attribute) {
      throw new Error('Attribute not found');
    }

    if (attributeUpdate.name) {
      attribute.name = attributeUpdate.name;
      attribute = await this.attributeRepository.save(attribute);
    }

    const existingValues = await this.attributeValueRepository.find({
      where: { attribute: { id: attribute.id } },
    });

    let savedValues: AttributeValue[] = [];

    // Assuming attributeUpdate.values contains the updated list of AttributeValues
    for (const incomingValue of attributeUpdate.values) {
      if (incomingValue.id) {
        let existingValue = existingValues.find(
          (ev) => ev.id === incomingValue.id,
        );
        if (existingValue) {
          existingValue.value = incomingValue.value;
          savedValues.push(
            await this.attributeValueRepository.save(existingValue),
          );
        }
      } else {
        let newValue = new AttributeValue();
        newValue.value = incomingValue.value;
        newValue.attribute = attribute; // Directly use the loaded attribute entity
        savedValues.push(await this.attributeValueRepository.save(newValue));
      }
    }

    // Handle deletions
    const incomingIds = attributeUpdate.values
      .map((iv) => iv.id)
      .filter((id) => id != null);
    const valuesToDelete = existingValues.filter(
      (ev) => !incomingIds.includes(ev.id),
    );
    for (const valueToDelete of valuesToDelete) {
      await this.attributeValueRepository.remove(valueToDelete);
    }

    // Reload the attribute to reflect the updates
    attribute = await this.attributeRepository.findOne({
      where: { id: attribute.id },
      relations: ['values'],
    });

    return attribute;
  }
}
