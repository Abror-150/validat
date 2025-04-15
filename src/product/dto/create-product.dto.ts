import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @ApiProperty({ example: 'Bmw x5' })
  name: string;
}
