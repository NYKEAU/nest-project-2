// src/heating/entities/heating.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('chauffage')
export class Heating {
  @PrimaryGeneratedColumn()
  id_chauffage: number;

  @Column()
  type_chauffage: string;

  @Column('float')
  surface: number;

  @Column()
  id_emission: number;
}