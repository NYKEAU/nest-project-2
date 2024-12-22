# NestJS Project Setup

Ce projet est basé sur **NestJS** et utilise **TypeORM** pour la gestion des migrations et des entités. Suivez les étapes ci-dessous pour configurer le projet sur votre machine.

## Prérequis

Avant de commencer, vous devez avoir installé les outils suivants sur votre machine :

- **Node.js** (version 16 ou supérieure) : [Node.js](https://nodejs.org/)
- **MySQL** (ou toute autre base de données supportée par TypeORM) : [MySQL](https://dev.mysql.com/downloads/)
- **npm** (ou **yarn**) : [npm](https://www.npmjs.com/)

## Étape 1 : Cloner le projet

Si vous n'avez pas encore cloné le projet, commencez par le faire avec la commande suivante :

```bash
git clone https://github.com/votre-utilisateur/nestjs-project.git
cd nestjs-project
```

## Étape 2 : Installer les dépendances

Ensuite, installez les dépendances nécessaires au projet en utilisant npm :

```bash
npm install
```

Cela installera toutes les dépendances du projet définies dans le fichier `package.json`.

## Étape 3 : Configuration de la base de données

### 1. Créez votre base de données

Avant de lancer le projet, vous devez configurer votre base de données MySQL. Vous pouvez créer une base de données en utilisant la ligne de commande MySQL ou un outil comme phpMyAdmin ou MySQL Workbench.

Exemple avec la ligne de commande :

```bash
mysql -u root -p
CREATE DATABASE nestjs;
```

### 2. Configurer le fichier de connexion à la base de données

Le fichier de configuration de TypeORM (connexion à la base de données) est situé dans `data-source.ts`. Ce fichier contient la configuration de la connexion à votre base de données MySQL.

Ouvrez `data-source.ts` et modifiez-le avec vos informations de connexion à la base de données.

```typescript
import { DataSource } from 'typeorm';
import { User } from './src/users/entities/user.entity';
import { Trip } from './src/trips/entities/trip.entity';
import { Emission } from './src/emissions/entities/emission.entity';
import { Heating } from './src/heating/entities/heating.entity';
import { Vehicle } from './src/vehicules/entities/vehicle.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost', // L'hôte de la base de données
  port: 3306, // Le port MySQL (par défaut 3306)
  username: 'root', // Nom d'utilisateur MySQL
  password: 'root', // Mot de passe MySQL
  database: 'nestjs', // Nom de la base de données que vous avez créée
  entities: [User, Trip, Emission, Heating, Vehicle],
  migrations: ['./src/migrations/*{.ts,.js}'],
  synchronize: false, // Ne pas synchroniser automatiquement la base de données
  logging: true, // Activer les logs pour les requêtes SQL
});

export default AppDataSource;
```

**Important** : Remplacez `root` et `root` par vos véritables identifiants de base de données si nécessaire.

## Étape 4 : Exécuter les migrations

### 1. Créez une migration

Si vous avez déjà créé des entités et que vous avez besoin de créer une migration pour générer la structure de la base de données, vous pouvez utiliser la commande suivante :

```bash
npm run typeorm migration:generate -- -d ./data-source.ts -n NomDeLaMigration
```

Cette commande générera une nouvelle migration dans le dossier `src/migrations/`.

### 2. Appliquer les migrations

Pour appliquer les migrations et créer les tables dans votre base de données, utilisez la commande suivante :

```bash
npm run typeorm migration:run -- -d ./data-source.ts
```

Cela exécutera toutes les migrations en attente, et les tables seront créées dans votre base de données.

### 3. Annuler une migration

Si vous avez besoin d'annuler une migration, vous pouvez utiliser la commande suivante :

```bash
npm run typeorm migration:revert -- -d ./data-source.ts
```

Cela annule la dernière migration appliquée.

## Étape 5 : Lancer l'application

Une fois les migrations appliquées et la base de données configurée, vous pouvez démarrer le serveur NestJS en mode développement avec la commande suivante :

```bash
npm run start:dev
```

Cela démarrera l'application en mode développement et surveillera les modifications des fichiers.

## Étape 6 : Tests

Si vous souhaitez exécuter des tests unitaires, vous pouvez utiliser la commande suivante :

```bash
npm run test
```

Pour exécuter les tests en mode "watch" et voir les changements en direct :

```bash
npm run test:watch
```

Pour exécuter les tests de bout en bout (E2E) :

```bash
npm run test:e2e
```

## Étape 7 : Autres commandes utiles

Voici quelques autres commandes utiles pour ce projet :

- **Linter** : Pour vérifier le code et le formater avec ESLint et Prettier :
  ```bash
  npm run lint
  ```
- **Formatage** : Pour formater le code source avec Prettier :
  ```bash
  npm run format
  ```
- **Construction** : Pour construire l'application :
  ```bash
  npm run build
  ```

## Dépannage

Si vous rencontrez des problèmes lors de l'installation ou de l'exécution du projet, voici quelques pistes à explorer :

- **Problèmes de base de données** : Vérifiez que MySQL est bien installé et que la base de données existe. Vous pouvez aussi vérifier que le fichier `data-source.ts` est correctement configuré.
- **Problèmes de migration** : Assurez-vous que la migration a bien été générée et que vous l'exécutez dans le bon ordre.
- **Problèmes avec `ts-node`** : Si vous rencontrez des erreurs liées à `ts-node`, vous pouvez essayer de réinstaller les dépendances du projet avec `npm install`.

## Conclusion

Vous avez maintenant toutes les informations nécessaires pour configurer, migrer et lancer votre projet NestJS avec TypeORM. Si vous avez des questions ou rencontrez des problèmes, n'hésitez pas à consulter la documentation officielle de [NestJS](https://docs.nestjs.com/) et de [TypeORM](https://typeorm.io/).
