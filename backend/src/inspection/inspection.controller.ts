import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

  @Delete()
  async deleteInspections(@Body() request: string[]): Promise<string> {
    return this.inspectionService.deleteInspection(request);
  }

  @Get(':id')
  async getInspectionById(@Param('id') id: string): Promise<Inspection> {
    return this.inspectionService.getInspectionById(id);
  }
}
