import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema({ collection: 'inspections' })
export class Inspection extends Document {
  @Prop()
  name: string;

  @Prop({ default: Date.now, type: SchemaTypes.Date })
  createDate: Date;

  //   @Prop()
  //   imageLink: string;

  @Prop()
  inspectionID: string;

  @Prop()
  note: string;

  @Prop()
  standardName: string;

  //   @Prop()
  //   samplingDate: Date;

  //   @Prop()
  //   samplingPoint: string[];

  @Prop()
  price: number;

  //   @Prop({ type: [StandardData] })
  @Prop()
  standardData: [
    {
      conditionMax: string;
      conditionMin: string;
      key: string;
      name: string;
      shape: string[];
      maxLength: number;
      minLength: number;
    },
  ];
}

export const InspectionSchema = SchemaFactory.createForClass(Inspection);
