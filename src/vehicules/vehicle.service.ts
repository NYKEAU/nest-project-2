import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  findAll() {
    return this.vehicleRepository.find();
  }

  findOne(id: number) {
    return this.vehicleRepository.findOne({ where: { id } });
  }
}
