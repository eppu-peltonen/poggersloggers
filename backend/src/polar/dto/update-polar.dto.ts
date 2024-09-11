import { PartialType } from '@nestjs/swagger';
import { CreatePolarDto } from './create-polar.dto';

export class UpdatePolarDto extends PartialType(CreatePolarDto) {}
