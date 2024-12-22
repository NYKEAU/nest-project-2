// src/trips/dto/update-trip.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateTripDto } from './create-trip.dto';

export class UpdateTripDto extends PartialType(CreateTripDto) {}
