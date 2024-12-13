// src/emissions/emissions.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { EmissionsService } from './emissions.service';
import { CreateEmissionDto } from './dto/create-emission.dto';
import { UpdateEmissionDto } from './dto/update-emission.dto';

@ApiTags('Emissions')
@ApiBearerAuth()
@Controller('emissions')
export class EmissionsController {
  constructor(private readonly emissionsService: EmissionsService) {}

  @ApiOperation({ summary: 'Create a new emission' })
  @ApiResponse({ status: 201, description: 'Emission successfully created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post()
  create(@Body() createEmissionDto: CreateEmissionDto) {
    return this.emissionsService.create(createEmissionDto);
  }

  @ApiOperation({ summary: 'Get all emissions' })
  @ApiResponse({ status: 200, description: 'Return all emissions' })
  @Get()
  findAll() {
    return this.emissionsService.findAll();
  }

  @ApiOperation({ summary: 'Get an emission by ID' })
  @ApiResponse({ status: 200, description: 'Return the emission' })
  @ApiResponse({ status: 404, description: 'Emission not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emissionsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update an emission' })
  @ApiResponse({ status: 200, description: 'Emission successfully updated' })
  @ApiResponse({ status: 404, description: 'Emission not found' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmissionDto: UpdateEmissionDto) {
    return this.emissionsService.update(+id, updateEmissionDto);
  }

  @ApiOperation({ summary: 'Delete an emission' })
  @ApiResponse({ status: 200, description: 'Emission successfully deleted' })
  @ApiResponse({ status: 404, description: 'Emission not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emissionsService.remove(+id);
  }
}