// src/emissions/dto/create-emission.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmissionDto {
  @ApiProperty({ example: 'Vehicle' })
  type_name: string;

  @ApiProperty({ example: 120.5 })
  emission_co2: number;

  @ApiProperty({ example: new Date() })
  date: Date;
}