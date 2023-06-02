import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema?: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value, { abortEarly: false });
    console.log('error in the validaito', error);
    if (error) {
      const validationErrors = error.details.map((error) => error.message);
      throw new BadRequestException(validationErrors.toString());
    }
    return value;
  }
}
