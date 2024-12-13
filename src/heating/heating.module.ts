// src/heating/heating.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeatingService } from './heating.service';
import { HeatingController } from './heating.controller';
import { Heating } from './entities/heating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Heating])],
  controllers: [HeatingController],
  providers: [HeatingService],
  exports: [HeatingService],
})
export class HeatingModule {}