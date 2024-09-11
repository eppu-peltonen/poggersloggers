import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PolarService } from './polar.service';
import { CreatePolarDto } from './dto/create-polar.dto';
import { UpdatePolarDto } from './dto/update-polar.dto';

@Controller('polar')
export class PolarController {
  constructor(private readonly polarService: PolarService) {}

  @Post()
  create(@Body() createPolarDto: CreatePolarDto) {
    return this.polarService.create(createPolarDto);
  }

  @Get()
  findAll() {
    return this.polarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.polarService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePolarDto: UpdatePolarDto) {
    return this.polarService.update(+id, updatePolarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.polarService.remove(+id);
  }
}
