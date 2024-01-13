import { Module } from '@nestjs/common';
import { StandardController } from './standard.controller';
import { StandardService } from './standard.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StandardSchema } from './schema/standard.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Standard', schema: StandardSchema }]),
  ],
  controllers: [StandardController],
  providers: [StandardService],
})
export class StandardModule {}
