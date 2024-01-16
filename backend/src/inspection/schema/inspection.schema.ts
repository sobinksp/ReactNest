import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { timestamp } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

interface GrainsProps {
  length: number;
  weight: number;
  shape: string;
  type: string;
}

interface JsonFileProps {
  requestID: string;
  imageURL: string;
  grains: GrainsProps[];
}

interface calculationProps {
  composition: {
    [key: string]: number;
  };
  defective: {
    [key: string]: number;
  };
}

@Schema({ collection: 'inspections', timestamps: true })
export class Inspection extends Document {
  @Prop()
  name: string;

  @Prop({ default: null })
  imageLink?: string;

  @Prop({ unique: true, required: true, default: () => uuidv4() })
  // @Prop({ unique: true, required: true })
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

  @Prop({ type: Object, default: null })
  jsonFile: JsonFileProps;

  @Prop({ type: Object, default: null })
  calculatedResult: calculationProps;
}

export const InspectionSchema = SchemaFactory.createForClass(Inspection);
