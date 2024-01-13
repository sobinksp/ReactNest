import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Standard } from './schema/standard.schema';
import mongoose from 'mongoose';

@Injectable()
export class StandardService {
  constructor(
    @InjectModel(Standard.name)
    private standardModel: mongoose.Model<Standard>,
  ) {}

  async findAll(): Promise<Standard[]> {
    const standards = await this.standardModel.find();
    return standards;
  }
}
