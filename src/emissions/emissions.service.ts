// src/emissions/emissions.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Emission } from './entities/emission.entity';
import { CreateEmissionDto } from './dto/create-emission.dto';
import { UpdateEmissionDto } from './dto/update-emission.dto';

@Injectable()
export class EmissionsService {
  constructor(
    @InjectRepository(Emission)
    private emissionsRepository: Repository<Emission>,
  ) {}

  async create(createEmissionDto: CreateEmissionDto): Promise<Emission> {
    try {
      const emission = this.emissionsRepository.create(createEmissionDto);
      const savedEmission = await this.emissionsRepository.save(emission);
      console.log('Emission saved successfully:', savedEmission);
      return savedEmission;
    } catch (error) {
      console.error('Error creating emission:', error);
      throw error;
    }
  }

  async findAll(): Promise<Emission[]> {
    return this.emissionsRepository.find();
  }

  async findOne(id: number): Promise<Emission> {
    const emission = await this.emissionsRepository.findOneBy({ id_emission: id });
    if (!emission) {
      throw new NotFoundException(`Emission with ID ${id} not found`);
    }
    return emission;
  }

  async update(id: number, updateEmissionDto: UpdateEmissionDto): Promise<Emission> {
    const emission = await this.findOne(id);
    Object.assign(emission, updateEmissionDto);
    return this.emissionsRepository.save(emission);
  }

  async remove(id: number): Promise<void> {
    const result = await this.emissionsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Emission with ID ${id} not found`);
    }
  }
}