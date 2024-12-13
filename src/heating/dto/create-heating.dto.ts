// src/heating/dto/create-heating.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateHeatingDto {
  @ApiProperty({ example: 'Gas' })
  type_chauffage: string;

  @ApiProperty({ example: 85.5 })
  surface: number;

  @ApiProperty({ example: 1 })
  id_emission: number;
}