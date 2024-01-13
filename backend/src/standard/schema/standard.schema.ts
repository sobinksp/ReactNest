import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'standards' })
export class Standard extends Document {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  createDate: Date;

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

export const StandardSchema = SchemaFactory.createForClass(Standard);
