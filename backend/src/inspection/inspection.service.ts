import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Inspection } from './schema/inspection.schema';
import mongoose from 'mongoose';

interface Calculation {
  composition: {
    [key: string]: number;
  };
  defective: {
    [key: string]: number;
  };
}

@Injectable()
export class InspectionService {
  constructor(
    @InjectModel(Inspection.name)
    private inspectionModel: mongoose.Model<Inspection>,
  ) {}

  // gt lt > <
  // gt le > <=
  // ge lt >= <
  // ge le >= <=
  filterCondition(value, jsonfile): number {
    switch (value.conditionMin) {
      case 'GT':
        return value.conditionMax === 'LT'
          ? jsonfile.grains.filter(
              (grain) =>
                grain.length > value.minLength &&
                grain.length < value.maxLength,
            ).length
          : jsonfile.grians.filter(
              (grain) =>
                grain.length > value.minLength &&
                grain.length <= value.maxLength,
            ).length;
      case 'GE':
        return value.conditionMax === 'LT'
          ? jsonfile.grains.filter(
              (grain) =>
                grain.length >= value.minLength &&
                grain.length < value.maxLength,
            ).length
          : jsonfile.grians.filter(
              (grain) =>
                grain.length >= value.minLength &&
                grain.length <= value.maxLength,
            ).length;

      default:
        return 0;
    }
  }

  async calculateInspection(request: Inspection): Promise<Calculation> {
    const totalGrains = request.jsonFile.grains.length;

    const composition: Calculation['composition'] = {};
    const defective: Calculation['defective'] = {};

    request.standardData.forEach((value, index) => {
      composition[value.key] =
        (this.filterCondition(value, request.jsonFile) * 100) / totalGrains;
    });
    const grains = request.jsonFile.grains;
    defective['white'] =
      (grains.filter((grain) => grain.type === 'white').length * 100) /
      totalGrains;
    defective['yellow'] =
      (grains.filter((grain) => grain.type === 'yellow').length * 100) /
      totalGrains;
    defective['red'] =
      (grains.filter((grain) => grain.type === 'red').length * 100) /
      totalGrains;
    defective['damage'] =
      (grains.filter((grain) => grain.type === 'damage').length * 100) /
      totalGrains;
    defective['paddy'] =
      (grains.filter((grain) => grain.type === 'paddy').length * 100) /
      totalGrains;
    defective['chalky'] =
      (grains.filter((grain) => grain.type === 'chalky').length * 100) /
      totalGrains;
    defective['glutinous'] =
      (grains.filter((grain) => grain.type === 'glutinous').length * 100) /
      totalGrains;
    defective['undermilled'] =
      (grains.filter((grain) => grain.type === 'undermilled').length * 100) /
      totalGrains;
    defective['total'] =
      (grains.filter((grain) => grain.type !== 'white').length * 100) /
      totalGrains;
    return { composition, defective };
  }

  async create(request: Inspection): Promise<Inspection> {
    if (request.jsonFile) {
      const result = await this.calculateInspection(request);
      request['calculatedResult'] = result;
    }
    const createdInspection = new this.inspectionModel(request);
    console.log(createdInspection);
    return createdInspection.save();
  }

  async getAllInspection(
    page: number = 1,
    limit: number = 10,
    id: string,
  ): Promise<any> {
    const skip = page * limit;
    let query = this.inspectionModel.find();
    if (id) {
      query = query.where('inspectionID').equals(id);
    }
    const inspections = await query.find().skip(skip).limit(limit);
    const totalCount = await this.inspectionModel.countDocuments();
    return { inspections, totalCount };
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

  async updateInspectionById(
    id: string,
    request: Inspection,
  ): Promise<Inspection> {
    return await this.inspectionModel.findOneAndUpdate(
      { inspectionID: id },
      request,
    );
  }
}
