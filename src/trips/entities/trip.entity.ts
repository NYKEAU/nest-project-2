// src/trips/entities/trip.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('trajet')
export class Trip {
  @PrimaryGeneratedColumn()
  id_trajet: number;

  @Column()
  adresse_depart: string;

  @Column()
  adresse_arrivee: string;

  @Column('float')
  distance: number;

  @Column()
  type_vehicule: string;

  @Column()
  id_emission: number;

  @Column()
  id_user: number;

  @ManyToOne(() => User)
  user: User;
}