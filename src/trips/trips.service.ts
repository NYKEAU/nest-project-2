import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from './entities/trip.entity';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripsRepository: Repository<Trip>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>, // Pour récupérer l'utilisateur
  ) {}

  async create(createTripDto: CreateTripDto, userId: number): Promise<Trip> {
    try {
      // Passer directement un objet minimal pour la relation utilisateur
      const trip = this.tripsRepository.create({
        ...createTripDto,
        user: { id_user: userId }, // Utilise la clé étrangère explicitement
      });

      // Sauvegarder le trip
      return await this.tripsRepository.save(trip);
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
