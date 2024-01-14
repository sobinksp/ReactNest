import { Body, Controller, Get, Post } from '@nestjs/common';
import { InspectionService } from './inspection.service';
import { Inspection } from './schema/inspection.schema';

@Controller('history')
export class InspectionController {
  constructor(private inspectionService: InspectionService) {}

  @Post()
  async createNewInspection(@Body() request: Inspection): Promise<Inspection> {
    const createdInspection = await this.inspectionService.create(request);
    return createdInspection;
  }

  @Get()
  async getAllInspections(): Promise<Inspection[]> {
    return this.inspectionService.getAllInspection();
  }
}
