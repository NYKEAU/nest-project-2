// src/trips/trips.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@ApiTags('Trips')
@ApiBearerAuth()
@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @ApiOperation({ summary: 'Create a new trip' })
  @ApiResponse({ status: 201, description: 'Trip successfully created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post()
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripsService.create(createTripDto);
  }

  @ApiOperation({ summary: 'Get all trips' })
  @ApiResponse({ status: 200, description: 'Return all trips' })
  @Get()
  findAll() {
    return this.tripsService.findAll();
  }

  @ApiOperation({ summary: 'Get a trip by ID' })
  @ApiResponse({ status: 200, description: 'Return the trip' })
  @ApiResponse({ status: 404, description: 'Trip not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tripsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a trip' })
  @ApiResponse({ status: 200, description: 'Trip successfully updated' })
  @ApiResponse({ status: 404, description: 'Trip not found' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTripDto: UpdateTripDto) {
    return this.tripsService.update(+id, updateTripDto);
  }

  @ApiOperation({ summary: 'Delete a trip' })
  @ApiResponse({ status: 200, description: 'Trip successfully deleted' })
  @ApiResponse({ status: 404, description: 'Trip not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tripsService.remove(+id);
  }
}