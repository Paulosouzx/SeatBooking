import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeatsService } from '../seat/seat.service';
import { SeatsController } from './seat.controller';
import { Seat } from './entities/seat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Seat])],
  controllers: [SeatsController],
  providers: [SeatsService],
  exports: [SeatsService],
})
export class SeatModule {}
