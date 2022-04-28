import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title!: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description!: string;
  @IsString()
  @IsNumber()
  @Min(1)
  @IsOptional()
  price!: number;
}
