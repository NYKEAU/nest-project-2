// src/trips/trips.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { RequestUser } from 'src/auth/interface/request-user.interface';

// Typage personnalisé pour Express Request
interface AuthenticatedRequest extends Request {
  user: RequestUser;
}

@ApiTags('Trips')
@ApiBearerAuth()
@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @ApiOperation({ summary: 'Create a new trip linked to the logged-in user' })
  @ApiResponse({ status: 201, description: 'Trip successfully created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
    @Body() createTripDto: CreateTripDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const user = req.user; // Maintenant TypeScript reconnaît user.id et user.email

    const userValues = Object.values(user);

    console.log('User values:', userValues);

    return this.tripsService.create(createTripDto, userValues[0]);
  }

  @Get()
  findAll() {
    return this.tripsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tripsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTripDto: UpdateTripDto) {
    return this.tripsService.update(+id, updateTripDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tripsService.remove(+id);
  }
}
