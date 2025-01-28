import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { SeatsService } from './seat.service';
import { BookSeatsRequest } from './entities/seat.request.interface';

@Controller('api/seats')
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}

  @Get()
  async getAvailableSeats() {
    return await this.seatsService.getAvailableSeats();
  }

  @Post()
  async bookSeats(@Body() body: BookSeatsRequest) {
    const { userId, seatNumbers } = body;
    return await this.seatsService.bookSeats(userId, seatNumbers);
  }

  @Get('user')
  async getUserSeats(@Query('userId') userId: string) {
    return await this.seatsService.getUserSeats(userId);
  }
}
