// src/emissions/entities/emission.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('emission')
export class Emission {
  @PrimaryGeneratedColumn()
  id_emission: number;

  @Column()
  type_name: string;

  @Column('float')
  emission_co2: number;

  @Column('timestamp')
  date: Date;
}