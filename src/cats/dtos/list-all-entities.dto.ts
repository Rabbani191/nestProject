import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

export class ListAllEntitiesDto {
  @ApiProperty({ required: false })
  limit?: number;

  @ApiProperty({ required: false })
  offset?: number;
}
export const ListAllEntitiesSchema = Joi.object({
  limit: Joi.number().min(1),
  offset: Joi.number().min(0),
});
