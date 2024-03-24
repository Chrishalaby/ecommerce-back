import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { UpdateProductDto } from 'src/dto/update-product.dto';
import { Image, Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    images: Express.Multer.File[],
  ): Promise<Product> {
    console.log(createProductDto);
    const imageEntities: Image[] = images.map((image) => {
      const imageUrl = `http://localhost:3000/${image.path.replace(/\\/g, '/')}`;
      let img = new Image();
      img.url = imageUrl;
      return img;
    });

    let product = this.productRepository.create({
      ...createProductDto,
      images: imageEntities,
    });

    return await this.productRepository.save(product);
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  findOne(id: number): Promise<Product> {
    return this.productRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    await this.productRepository.update(id, updateProductDto);
    return this.findOne(id);
  }

  remove(id: number): Promise<void> {
    return this.productRepository.delete(id).then(() => {});
  }
}
