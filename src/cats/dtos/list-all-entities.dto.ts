import { ApiProperty } from '@nestjs/swagger';

export class ListAllEntitiesDto {
  @ApiProperty({ required: true })
  limit?: number;

  @ApiProperty({ required: true })
  offset?: number;
}