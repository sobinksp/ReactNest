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

  async getAllInspection(): Promise<Inspection[]> {
    const inspections = await this.inspectionModel.find();
    return inspections;
  }

  async deleteInspection(request: string[]): Promise<string> {
    await this.inspectionModel
      .deleteMany({ inspectionID: { $in: request } })
      .exec();
    return 'deleted successfully.';
  }

  async getInspectionById(id: string): Promise<Inspection> {
    return await this.inspectionModel.findOne({ inspectionID: id });
  }
}
