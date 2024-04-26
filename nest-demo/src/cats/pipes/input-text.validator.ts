import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodObject } from 'zod';

@Injectable()
export class InputTextValidator implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    console.log({ metadata });
    if (!/^[a-zA-Z]+$/.test(value)) {
      throw new BadRequestException('Invalid input. Only letters are allowed.');
    }
    return value;
  }
}

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject<any>) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      this.schema.parse(value);
    } catch (error) {
      throw new BadRequestException('Validation failed');
    }
    //here we are just returing value
    //we can alos transform this value
    //since pipes are also ment to transfor the data
    console.log({ metadata });
    return value;
  }
}
