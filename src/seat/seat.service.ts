import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seat } from '../seat/entities/seat.entity';
import { In } from 'typeorm';

@Injectable()
export class SeatsService {
  constructor(
    @InjectRepository(Seat)
    private readonly seatRepository: Repository<Seat>,
  ) {}

  async initializeSeats() {
    const existingSeats = await this.seatRepository.find();

    if (existingSeats.length === 0) {
      const seats: Seat[] = [];
      for (let i = 1; i <= 10; i++) {
        const seat = new Seat();
        seat.seatNumber = `A${i}`;
        seat.status = 'available';
        seats.push(seat);
      }
      await this.seatRepository.save(seats);
      console.log('10 seats have been inserted into the database');
    } else {
      console.log('Seats already exist in the database');
    }
  }

  async getAvailableSeats() {
    return await this.seatRepository.find({ where: { status: 'available' } });
  }

  async bookSeats(userId: string, seatNumbers: string[]) {
    const availableSeats = await this.seatRepository.find({
      where: { seatNumber: In(seatNumbers), status: 'available' },
    });

    const failedSeats: string[] = [];
    const bookedSeats: string[] = [];

    for (const seat of availableSeats) {
      seat.status = 'booked';
      seat.userId = userId;
      bookedSeats.push(seat.seatNumber);
      await this.seatRepository.save(seat);
    }

    const availableSeatNumbers = new Set(
      availableSeats.map((seat) => seat.seatNumber),
    );
    seatNumbers.forEach((seat) => {
      if (!availableSeatNumbers.has(seat)) failedSeats.push(seat);
    });

    return {
      message:
        failedSeats.length === 0
          ? 'Seats successfully reserved'
          : 'Some seats could not be reserved',
      bookedSeats,
      failedSeats,
    };
  }

  async getUserSeats(userId: string) {
    const userSeats = await this.seatRepository.find({
      where: {
        userId: userId,
        status: 'booked',
      },
    });

    if (userSeats.length === 0) {
      return {
        message: `There are no seats reserved for the given ID ${userId}`,
      };
    }

    return {
      userId: userId,
      bookedSeats: userSeats.map((seat) => ({
        seatNumber: seat.seatNumber,
        status: seat.status,
      })),
    };
  }
}
