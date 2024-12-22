// src/trips/trips.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from './entities/trip.entity';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { User } from 'src/users/entities/user.entity';
import axios from 'axios';
import * as dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripsRepository: Repository<Trip>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>, // Pour récupérer l'utilisateur
  ) {}

  private async calculateDistance(
    address1: string,
    address2: string,
  ): Promise<number> {
    const apiKey = process.env.DISTANCE_MATRIX_API_KEY; // Remplacez par votre clé API de distancematrix.ai
    const url = `https://api-v2.distancematrix.ai/maps/api/distancematrix/json?origins=${encodeURIComponent(address1)}&destinations=${encodeURIComponent(address2)}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const distanceText = response.data.rows[0].elements[0].distance.text;
      const distanceValue = parseFloat(distanceText); // On récupère la distance en km
      return distanceValue;
    } catch (error) {
      console.error('Erreur lors du calcul de la distance:', error);
      throw new Error('Impossible de calculer la distance');
    }
  }

  async create(createTripDto: CreateTripDto, userId: number): Promise<Trip> {
    try {
      // Calculer la distance à partir des adresses
      const distance = await this.calculateDistance(
        createTripDto.adresse_depart,
        createTripDto.adresse_arrivee,
      );

      // Passer directement un objet minimal pour la relation utilisateur
      const trip = this.tripsRepository.create({
        ...createTripDto,
        distance, // On utilise la distance calculée par l'API
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
