// src/trips/dto/create-trip.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateTripDto {
  @ApiProperty({ example: '123 Rue de Paris' })
  adresse_depart: string;

  @ApiProperty({ example: '456 Avenue des Champs-Élysées' })
  adresse_arrivee: string;

  @ApiProperty({ example: 15.5 })
  distance: number;

  @ApiProperty({ example: 'Tesla Model 3' })
  type_vehicule: string;

  @ApiProperty({ example: 1 })
  id_user: number;
}