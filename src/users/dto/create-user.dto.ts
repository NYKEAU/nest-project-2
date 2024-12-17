// src/users/dto/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'john.doe@example.com' })
  mail: string;

  @ApiProperty({ example: 'password123' })
  crypted_mdp: string;

  @ApiProperty({ example: 'Doe' })
  nom: string;

  @ApiProperty({ example: 'John' })
  prenom: string;

  @ApiProperty({ example: 'Paris' })
  ville: string;

  @ApiProperty({
    example: 'Tesla Model 3',
    required: false,
  })
  vehicule_par_defaut: string;
}
