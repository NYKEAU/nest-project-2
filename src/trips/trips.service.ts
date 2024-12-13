// src/trips/trips.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from './entities/trip.entity';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip)
    private tripsRepository: Repository<Trip>,
  ) {}

  async create(createTripDto: CreateTripDto): Promise<Trip> {
    try {
      const trip = this.tripsRepository.create(createTripDto);
      const savedTrip = await this.tripsRepository.save(trip);
      console.log('Trip saved successfully:', savedTrip);
      return savedTrip;
    } catch (error) {
      console.error('Error creating trip:', error);
      throw error;
    }
  }

  async findAll(): Promise<Trip[]> {
    return this.tripsRepository.find();
  }

  async findOne(id: number): Promise<Trip> {
    const trip = await this.tripsRepository.findOneBy({ id_trajet: id });
    if (!trip) {
      throw new NotFoundException(`Trip with ID ${id} not found`);
    }
    return trip;
  }

  async update(id: number, updateTripDto: UpdateTripDto): Promise<Trip> {
    const trip = await this.findOne(id);
    Object.assign(trip, updateTripDto);
    return this.tripsRepository.save(trip);
  }

  async remove(id: number): Promise<void> {
    const result = await this.tripsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Trip with ID ${id} not found`);
    }
  }
}