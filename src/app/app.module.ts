import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeatModule } from '../seat/seat.module';
import { SeatsService } from 'src/seat/seat.service';
import { Seat } from 'src/seat/entities/seat.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'paulo123',
      database: 'seat',
      synchronize: true,
      entities: [Seat],
    }),
    SeatModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly seatsService: SeatsService) {}

  async onModuleInit() {
    await this.seatsService.initializeSeats();
  }
}
