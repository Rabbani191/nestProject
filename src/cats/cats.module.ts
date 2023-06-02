import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './services/cats.service';
import { JoiValidationPipe } from './validators/validation.pipe';
import { createCatSchema } from './dtos/create-cats.dto';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [],
  controllers: [CatsController],
  providers: [
    CatsService,
    { provide: JoiValidationPipe, useValue: JoiValidationPipe },
    RolesGuard,
  ],
})
export class CatsModule {}
