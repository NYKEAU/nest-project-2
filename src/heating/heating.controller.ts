// src/heating/heating.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { HeatingService } from './heating.service';
import { CreateHeatingDto } from './dto/create-heating.dto';
import { UpdateHeatingDto } from './dto/update-heating.dto';

@ApiTags('Heating')
@ApiBearerAuth()
@Controller('heatings')
export class HeatingController {
  constructor(private readonly heatingService: HeatingService) {}

  @ApiOperation({ summary: 'Create a new heating record' })
  @ApiResponse({ status: 201, description: 'Heating record successfully created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post()
  create(@Body() createHeatingDto: CreateHeatingDto) {
    return this.heatingService.create(createHeatingDto);
  }

  @ApiOperation({ summary: 'Get all heating records' })
  @ApiResponse({ status: 200, description: 'Return all heating records' })
  @Get()
  findAll() {
    return this.heatingService.findAll();
  }

  @ApiOperation({ summary: 'Get a heating record by ID' })
  @ApiResponse({ status: 200, description: 'Return the heating record' })
  @ApiResponse({ status: 404, description: 'Heating record not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.heatingService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a heating record' })
  @ApiResponse({ status: 200, description: 'Heating record successfully updated' })
  @ApiResponse({ status: 404, description: 'Heating record not found' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHeatingDto: UpdateHeatingDto) {
    return this.heatingService.update(+id, updateHeatingDto);
  }

  @ApiOperation({ summary: 'Delete a heating record' })
  @ApiResponse({ status: 200, description: 'Heating record successfully deleted' })
  @ApiResponse({ status: 404, description: 'Heating record not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.heatingService.remove(+id);
  }
}