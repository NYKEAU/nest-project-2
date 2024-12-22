// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TripsModule } from './trips/trips.module';
import { EmissionsModule } from './emissions/emissions.module';
import { HeatingModule } from './heating/heating.module';
import { VehicleModule } from './vehicules/vehicle.module';
import { User } from './users/entities/user.entity';
import { Trip } from './trips/entities/trip.entity';
import { Emission } from './emissions/entities/emission.entity';
import { Heating } from './heating/entities/heating.entity';
import { Vehicle } from './vehicules/entities/vehicle.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nestjs',
      entities: [User, Trip, Emission, Heating, Vehicle],
      synchronize: false,
    }),
    UsersModule,
    TripsModule,
    EmissionsModule,
    HeatingModule,
    AuthModule,
    VehicleModule,
  ],
})
export class AppModule {}
