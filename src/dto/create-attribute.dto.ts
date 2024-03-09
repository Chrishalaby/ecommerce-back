import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';

class CreateAttributeValueDto {
  @IsString()
  value: string;
}

export class CreateAttributeDto {
  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAttributeValueDto)
  @IsOptional()
  values?: CreateAttributeValueDto[];
}
