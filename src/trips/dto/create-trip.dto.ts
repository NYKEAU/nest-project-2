// src/trips/dto/create-trip.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateTripDto {
  @ApiProperty({
    example: '123 Rue de Paris',
    description: 'Adresse de départ du trajet',
  })
  @IsString()
  @IsNotEmpty()
  adresse_depart: string;

  @ApiProperty({
    example: '456 Avenue des Champs-Élysées',
    description: "Adresse d'arrivée du trajet",
  })
  @IsString()
  @IsNotEmpty()
  adresse_arrivee: string;

  @ApiProperty({
    example: 15.5,
    description: 'Distance du trajet en kilomètres',
  })
  @IsNumber()
  @IsNotEmpty()
  distance: number;

  @ApiProperty({
    example: '11',
    description: 'Identifiant du véhicule utilisé pour le trajet',
  })
  @IsString()
  @IsNotEmpty()
  type_vehicule: string;

  @ApiProperty({
    example: 1,
    description: "Identifiant de l'utilisateur ayant créé le trajet",
  })
  @IsNumber()
  @IsNotEmpty()
  id_user: number;
}
