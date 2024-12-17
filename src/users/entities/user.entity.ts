// src/users/entities/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('utilisateur')
export class User {
  @PrimaryGeneratedColumn()
  id_user: number;

  @Column({ unique: true })
  mail: string;

  @Column()
  crypted_mdp: string;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column()
  ville: string;

  @Column({ nullable: true })
  vehicule_par_defaut: string;

  @Column({ nullable: true })
  id_chauffage: number;

  @Column({ nullable: true })
  id_emission: number;
}
