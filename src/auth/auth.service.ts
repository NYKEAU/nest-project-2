// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.crypted_mdp)) {
      const { crypted_mdp, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.mail, sub: user.id_user };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id_user,
        email: user.mail,
        nom: user.nom,
        prenom: user.prenom
      }
    };
  }
}