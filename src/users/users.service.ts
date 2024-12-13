import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const existingUser = await this.usersRepository.findOne({
        where: { mail: createUserDto.mail },
      });

      if (existingUser) {
        throw new ConflictException('Email already exists');
      }

      const hashedPassword = await bcrypt.hash(createUserDto.crypted_mdp, 10);
      
      const user = this.usersRepository.create({
        ...createUserDto,
        crypted_mdp: hashedPassword,
      });

      console.log('Attempting to save user:', user); // Debug log

      const savedUser = await this.usersRepository.save(user);
      console.log('User saved successfully:', savedUser); // Debug log
      
      return savedUser;
    } catch (error) {
      console.error('Error creating user:', error); // Error log
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.usersRepository.find();
      console.log('Found users:', users); // Debug log
      return users;
    } catch (error) {
      console.error('Error finding users:', error); // Error log
      throw error;
    }
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id_user: id });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.usersRepository.findOneBy({ id_user: id });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      // Don't update password through regular update
      delete updateUserDto.crypted_mdp;

      Object.assign(user, updateUserDto);
      const savedUser = await this.usersRepository.save(user);
      console.log('User updated successfully:', savedUser);
      return savedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.usersRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      console.log('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { mail: email } });
  }
} 