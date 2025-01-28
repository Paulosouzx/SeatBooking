import { ApiProperty } from '@nestjs/swagger';

export class BookSeatsRequest {
  @ApiProperty({
    description: 'User ID who is reserving the seats',
    type: String,
  })
  userId: string;

  @ApiProperty({
    description: 'List of seat numbers the user wants to reserve',
    type: [String],
  })
  seatNumbers: string[];
}
