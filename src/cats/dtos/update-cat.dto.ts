import { ApiProperty } from '@nestjs/swagger';

export class UpdateCatDto {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  age?: number;

  @ApiProperty({ required: false })
  breed?: string;
}
