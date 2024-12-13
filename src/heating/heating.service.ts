// src/heating/heating.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Heating } from './entities/heating.entity';
import { CreateHeatingDto } from './dto/create-heating.dto';
import { UpdateHeatingDto } from './dto/update-heating.dto';

@Injectable()
export class HeatingService {
  constructor(
    @InjectRepository(Heating)
    private heatingRepository: Repository<Heating>,
  ) {}

  async create(createHeatingDto: CreateHeatingDto): Promise<Heating> {
    try {
      const heating = this.heatingRepository.create(createHeatingDto);
      const savedHeating = await this.heatingRepository.save(heating);
      console.log('Heating saved successfully:', savedHeating);
      return savedHeating;
    } catch (error) {
      console.error('Error creating heating:', error);
      throw error;
    }
  }

  async findAll(): Promise<Heating[]> {
    return this.heatingRepository.find();
  }

  async findOne(id: number): Promise<Heating> {
    const heating = await this.heatingRepository.findOneBy({ id_chauffage: id });
    if (!heating) {
      throw new NotFoundException(`Heating with ID ${id} not found`);
    }
    return heating;
  }

  async update(id: number, updateHeatingDto: UpdateHeatingDto): Promise<Heating> {
    const heating = await this.findOne(id);
    Object.assign(heating, updateHeatingDto);
    return this.heatingRepository.save(heating);
  }

  async remove(id: number): Promise<void> {
    const result = await this.heatingRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Heating with ID ${id} not found`);
    }
  }
}