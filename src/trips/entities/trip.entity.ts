import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
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

  @ManyToOne(() => User, { nullable: false }) // Relation obligatoire
  @JoinColumn({ name: 'id_user' }) // Définit le nom de la clé étrangère
  user: User;
}
