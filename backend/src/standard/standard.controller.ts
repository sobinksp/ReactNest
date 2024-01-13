import { Controller, Get } from '@nestjs/common';
import { StandardService } from './standard.service';
import { Standard } from './schema/standard.schema';

@Controller('standard')
export class StandardController {
  constructor(private standardService: StandardService) {}

  @Get()
  async getAllStandards(): Promise<Standard[]> {
    return this.standardService.findAll();
  }
}
