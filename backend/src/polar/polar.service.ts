import { Injectable } from '@nestjs/common';
import { CreatePolarDto } from './dto/create-polar.dto';
import { UpdatePolarDto } from './dto/update-polar.dto';

@Injectable()
export class PolarService {
  create(createPolarDto: CreatePolarDto) {
    return 'This action adds a new polar';
  }

  findAll() {
    return `This action returns all polar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} polar`;
  }

  update(id: number, updatePolarDto: UpdatePolarDto) {
    return `This action updates a #${id} polar`;
  }

  remove(id: number) {
    return `This action removes a #${id} polar`;
  }
}
