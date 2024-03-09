import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Attribute, AttributeValue } from './attribute.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('decimal')
  price: number;

  @Column()
  stock: number;

  @OneToMany(
    () => ProductAttribute,
    (productAttribute) => productAttribute.product,
    { cascade: true },
  )
  attributes: ProductAttribute[];
}

@Entity()
export class ProductAttribute {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.attributes)
  product: Product;

  @ManyToOne(() => Attribute)
  attribute: Attribute;

  @ManyToOne(() => AttributeValue)
  attributeValue: AttributeValue;
}
