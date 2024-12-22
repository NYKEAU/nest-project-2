import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateVehiclesTable1631310709278 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE vehicles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Modifiez l'insertion pour ne pas spécifier l'id, il est généré automatiquement
    await queryRunner.query(`
      INSERT INTO vehicles (name) VALUES
      ('Avion'),
      ('TGV'),
      ('Intercités'),
      ('Voiture thermique'),
      ('Voiture électrique'),
      ('Autocar thermique'),
      ('Vélo ou marche'),
      ('Vélo à assistance électrique'),
      ('Bus thermique'),
      ('Tramway'),
      ('Métro'),
      ('Scooter ou moto légère thermique'),
      ('Moto thermique'),
      ('RER ou Transilien'),
      ('TER'),
      ('Bus électrique'),
      ('Trottinette à assistance électrique'),
      ('Bus (GNV)'),
      ('Covoiturage thermique (1 passager)'),
      ('Covoiturage thermique (2 passagers)'),
      ('Covoiturage thermique (3 passagers)'),
      ('Covoiturage thermique (4 passagers)'),
      ('Covoiturage électrique (1 passager)'),
      ('Covoiturage électrique (2 passagers)'),
      ('Covoiturage électrique (3 passagers)'),
      ('Covoiturage électrique (4 passagers)');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS vehicles`);
  }
}
