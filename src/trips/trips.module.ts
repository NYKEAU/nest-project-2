import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { Trip } from './entities/trip.entity';
import { UsersModule } from '../users/users.module'; // Importer le UsersModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Trip]), // Fournit TripRepository
    UsersModule, // Fournit UserRepository via UsersModule
  ],
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}
