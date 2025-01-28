import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  seatNumber: string;

  @Column({ default: 'avaliable' })
  @IsString()
  status: string;

  @Column({ nullable: true })
  @IsString()
  userId: string;
}
