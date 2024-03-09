import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Attribute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    () => AttributeValue,
    (attributeValue) => attributeValue.attribute,
    { cascade: true, onDelete: 'CASCADE' },
  )
  values: AttributeValue[];
}

@Entity()
export class AttributeValue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @ManyToOne(() => Attribute, (attribute) => attribute.values)
  @JoinColumn({ name: 'attribute_id' })
  attribute: Attribute;
}
