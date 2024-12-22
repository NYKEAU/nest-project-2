import { DataSource } from 'typeorm';
import { User } from './src/users/entities/user.entity';
import { Trip } from './src/trips/entities/trip.entity';
import { Emission } from './src/emissions/entities/emission.entity';
import { Heating } from './src/heating/entities/heating.entity';
import { Vehicle } from './src/vehicules/entities/vehicle.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'nestjs',
  entities: [User, Trip, Emission, Heating, Vehicle],
  migrations: ['./src/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: true,
});
