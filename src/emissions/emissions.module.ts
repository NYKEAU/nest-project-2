// src/emissions/emissions.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmissionsService } from './emissions.service';
import { EmissionsController } from './emissions.controller';
import { Emission } from './entities/emission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Emission])],
  controllers: [EmissionsController],
  providers: [EmissionsService],
  exports: [EmissionsService],
})
export class EmissionsModule {}