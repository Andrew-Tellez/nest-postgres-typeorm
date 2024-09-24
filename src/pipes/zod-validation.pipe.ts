import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema<any>) {}

  transform(value: any) {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      const errors = result.error.errors.map(
        (e) => `${e.path.join('.')} - ${e.message}`,
      );
      throw new BadRequestException(`Validation failed: ${errors.join(', ')}`);
    }

    return result.data;
  }
}
