import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({ collection: 'inspections' })
export class Inspection extends Document {
  @Prop()
  name: string;

  @Prop({ default: Date.now, type: SchemaTypes.Date })
  createDate: Date;

  @Prop({ default: null })
  imageLink?: string;

  @Prop({ unique: true, required: true, default: () => uuidv4() })
  inspectionID?: string;

  @Prop({ default: null })
  standardID: string;

  @Prop({ default: null })
  note?: string;

  @Prop()
  standardName: string;

  @Prop({ default: null })
  samplingDate?: Date;

  @Prop({ default: null })
  samplingPoint?: string[];

  @Prop({ default: null })
  price?: number;
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
