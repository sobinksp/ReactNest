import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Inspection } from './schema/inspection.schema';
import mongoose from 'mongoose';

@Injectable()
export class InspectionService {
  constructor(
    @InjectModel(Inspection.name)
    private inspectionModel: mongoose.Model<Inspection>,
  ) {}

  async create(request: Inspection): Promise<Inspection> {
    const createdInspection = new this.inspectionModel(request);
    return createdInspection.save();
  }
}
