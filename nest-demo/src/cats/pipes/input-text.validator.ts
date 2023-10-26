import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

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
